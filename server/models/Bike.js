const mongoose = require("mongoose");

const bikeSchema = new mongoose.Schema(
  {
    name: String,
    brand: String,
    price: Number,
    cc: Number,
  },
  { timestamps: true }
);

// Prevent overwrite error
const Bike =
  mongoose.models.Bike || mongoose.model("Bike", bikeSchema);

module.exports = Bike;