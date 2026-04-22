const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
  offerId: { type: String, required: true, unique: true },
  discountType: {
    type: String,
    enum: ["flat", "percentage"],
    required: true,
  },
  discountValue: { type: Number, required: true },
});

// Prevent overwrite error
const Offer = mongoose.models.Offer || mongoose.model("Offer", offerSchema);

module.exports = Offer;