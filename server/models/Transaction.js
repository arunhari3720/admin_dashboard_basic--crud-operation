const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    planName: String,
    amount: Number,
    paymentMethod: String,
  },
  { timestamps: true }
);

// Prevent overwrite error
const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;