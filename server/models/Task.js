const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: String,

    status: {
      type: String,
      enum: ["Completed", "In Progress"],
      default: "In Progress",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    due: Date,

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// Prevent overwrite error
const Task =
  mongoose.models.Task || mongoose.model("Task", taskSchema);

module.exports = Task;