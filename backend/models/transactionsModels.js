const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  buyer: String,
  seller: String,
  region: String,
  credits: Number,
  ethAmount: Number,
  tokenId: String,
  txHash: String,
  type: {
    type: String,
    enum: ["BUY", "SELL"], // ✅ Include both
    required: true
  },
}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);
