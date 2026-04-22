const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["superadmin", "user", "admin", "hr", "teamleader"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent overwrite error
const User =
  mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;