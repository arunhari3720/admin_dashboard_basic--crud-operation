const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    logo: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Prevent overwrite error
const Settings =
  mongoose.models.Settings || mongoose.model("Settings", settingsSchema);

module.exports = Settings;