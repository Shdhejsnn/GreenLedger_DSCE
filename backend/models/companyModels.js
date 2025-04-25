const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: String,
  companyType: Number,
  fromAddress: String,
  threshold: String, // Could be a number or string, adjust as per your requirement
  walletAddress: String,
});

module.exports = mongoose.model("Company", companySchema);