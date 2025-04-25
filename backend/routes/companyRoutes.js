const express = require("express");
const router = express.Router();
const { contract, web3 } = require("../contract");
const Company = require("../models/companyModels");
const Transaction = require("../models/transactionsModels");

<<<<<<< HEAD
const ownerAddress = "0x412531A590ebfcc251a7323220788a2FEb082358"; // 💡 Ganache deployer
=======
const ownerAddress = "0xb166618AB435aC23c5BD20d47d825A74E9Be35d2"; // 💡 Ganache deployer
>>>>>>> 942dd7dbcefcf98d1519a7920640148a964162cc

// ✅ Register company
router.post("/register", async (req, res) => {
  const { name, companyType, fromAddress } = req.body;

  if (!name || companyType === undefined || !fromAddress) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const tx = await contract.methods
      .registerCompany(name, companyType)
      .send({ from: fromAddress, gas: 3000000 });

    // 🔥 Save to MongoDB
    const company = new Company({
      name,
      wallet: fromAddress,
      type: companyType,
      txHash: tx.transactionHash,
    });
    await company.save();

    res.json({
      message: "Company registered successfully",
      txHash: tx.transactionHash,
    });
  } catch (err) {
    console.error("❌ Register Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get company details
router.get("/company/:address", async (req, res) => {
  const { address } = req.params;

  try {
    const data = await contract.methods.getCompany(address).call();

    res.json({
      name: data[0],
      wallet: data[1],
      type: parseInt(data[2]),
      threshold: data[3].toString(),
      registered: data[4],
    });
  } catch (err) {
    console.error("❌ Fetch Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Buy credits
router.post("/buy", async (req, res) => {
  let { from, privateKey, region, ethAmount, amount } = req.body;
  amount = parseInt(amount);

  if (!from || !privateKey || !region || !ethAmount || !amount) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const tokenURI = "ipfs://dummy-metadata-url";
    const valueInWei = web3.utils.toWei(ethAmount.toString(), "ether");
    const nonce = await web3.eth.getTransactionCount(from);
    const gasPrice = await web3.eth.getGasPrice();

    const txData = contract.methods
      .buyCredit(region, amount, tokenURI)
      .encodeABI();

    const tx = {
      from,
      to: contract.options.address,
      data: txData,
      value: valueInWei,
      gas: 3000000,
      gasPrice,
      nonce,
    };

    const signed = await web3.eth.accounts.signTransaction(tx, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);

    const transferEvent = receipt.logs.find(
      (log) => log.topics[0] === web3.utils.sha3("Transfer(address,address,uint256)")
    );

    let tokenId = "unknown";
    if (transferEvent) {
      tokenId = web3.utils.hexToNumberString(transferEvent.topics[3]);
    }

    // 🔥 Save to MongoDB
    const transaction = new Transaction({
      buyer: from,
      region,
      credits: amount,
      ethAmount,
      tokenId,
      txHash: receipt.transactionHash,
      type: "BUY"
    });
    await transaction.save();

    res.json({
      message: `✅ Bought ${amount} carbon credits from region ${region}`,
      txHash: receipt.transactionHash,
      ledger: {
        buyer: from,
        region,
        credits: amount,
        ethSpent: ethAmount,
        contract: contract.options.address,
        transactionHash: receipt.transactionHash,
        tokenId,
      },
    });
  } catch (err) {
    console.error("❌ Smart Contract Buy Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Sell credits
router.post("/sell", async (req, res) => {
  const { from, privateKey, tokenId, region, credits, expectedEth } = req.body;

  if (!from || !privateKey || !tokenId || !region || !credits || !expectedEth) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const ownerAddress = process.env.OWNER_ADDRESS;
    const ownerPrivateKey = process.env.OWNER_PRIVATE_KEY;
    const priceInWei = web3.utils.toWei(expectedEth.toString(), "ether");

    const transferTx = contract.methods.transferFrom(from, ownerAddress, tokenId).encodeABI();
    const nonce1 = await web3.eth.getTransactionCount(from);
    const gasPrice = await web3.eth.getGasPrice();

    const signedTransfer = await web3.eth.accounts.signTransaction({
      from,
      to: contract.options.address,
      data: transferTx,
      gas: 300000,
      gasPrice,
      nonce: nonce1,
    }, privateKey);

    const transferReceipt = await web3.eth.sendSignedTransaction(signedTransfer.rawTransaction);

    const nonce2 = await web3.eth.getTransactionCount(ownerAddress);
    const signedPayment = await web3.eth.accounts.signTransaction({
      from: ownerAddress,
      to: from,
      value: priceInWei,
      gas: 21000,
      gasPrice,
      nonce: nonce2,
    }, ownerPrivateKey);

    const paymentReceipt = await web3.eth.sendSignedTransaction(signedPayment.rawTransaction);

    // 🔥 Save to MongoDB
    const transaction = new Transaction({
      seller: from,
      region,
      credits,
      ethAmount: expectedEth,
      tokenId,
      txHash: paymentReceipt.transactionHash,
      type: "SELL"
    });
    await transaction.save();

    res.json({
      message: `✅ Sold token ${tokenId} for ${expectedEth} ETH`,
      ledger: {
        txHash: paymentReceipt.transactionHash,
        tokenId,
        region,
        credits,
        seller: from,
        ethAmount: expectedEth,
      }
    });
  } catch (err) {
    console.error("❌ Sell Error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
