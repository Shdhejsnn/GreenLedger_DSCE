const Web3 = require("web3").default;
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const web3 = new Web3("http://127.0.0.1:7545");

// ✅ Paste your deployed contract address here
const contractAddress = "0xFCEA07fb5aa1381EA4ED082F86562dC9305DcEa3"; // 👈 Update this

// ✅ Load ABI from artifacts
const abiPath = path.resolve(__dirname, "../smart-contracts/artifacts/contracts/GreenLedger.sol/GreenLedger.json");
const contractABI = JSON.parse(fs.readFileSync(abiPath)).abi;

// ✅ Connect to contract
const contract = new web3.eth.Contract(contractABI, contractAddress);

module.exports = { web3, contract };
