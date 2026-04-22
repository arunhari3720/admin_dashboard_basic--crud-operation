const Transaction = require("../models/Transaction");

// Create Transaction
const createTransaction = async (req, res) => {
  try {
    const { planName, amount, paymentMethod } = req.body;

    const transaction = await Transaction.create({
      planName,
      amount,
      paymentMethod,
    });

    // SOCKET EMIT
    const io = req.app.get("io");

    if (io) {
      console.log("EMITTING PAYMENT EVENT");

      io.emit("new-payment", {
        message: "New payment received 💰",
        data: transaction,
      });
    }

    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Transactions
const getTransactions = async (req, res) => {
  try {
    const data = await Transaction.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createTransaction,
  getTransactions,
};