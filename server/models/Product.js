const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    features: [String],
    isCustom: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Prevent overwrite error
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

module.exports = Product;