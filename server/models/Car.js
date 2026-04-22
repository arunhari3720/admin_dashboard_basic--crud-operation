const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    carId: { type: String, required: true, unique: true },
    model: { type: String, required: true },
    price: { type: Number, required: true },
    offerId: { type: String, default: null },
    finalPrice: { type: Number, default: 0 },
    discountPercentage: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Prevent overwrite error
const Car =
  mongoose.models.Car || mongoose.model("Car", carSchema);

module.exports = Car;