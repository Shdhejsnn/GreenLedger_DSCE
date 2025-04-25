const Web3 = require("web3").default;
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const web3 = new Web3("http://127.0.0.1:7545");

// ✅ Paste your deployed contract address here
<<<<<<< HEAD
const contractAddress = "0x5bE84B3591A8C7689C5Fb6f0Bf3A90d526d478d8"; // 👈 Update this
=======
const contractAddress = "0x75e5986202c9F51D74B3f870678715CAb8628157"; // 👈 Update this
>>>>>>> 942dd7dbcefcf98d1519a7920640148a964162cc

// ✅ Load ABI from artifacts
const abiPath = path.resolve(__dirname, "../smart-contracts/artifacts/contracts/GreenLedger.sol/GreenLedger.json");
const contractABI = JSON.parse(fs.readFileSync(abiPath)).abi;

// ✅ Connect to contract
const contract = new web3.eth.Contract(contractABI, contractAddress);

module.exports = { web3, contract };
