import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true
    },

    image: {
      type: String,
      default: ""
    },

    address: {
      type: String,
      default: ""
    },

    role: {
      type: String,
      enum: ["superadmin","user", "admin","hr", "teamleader"], // 🔥 restrict values
      default: "user"
    }
  },
  {
    timestamps: true // 🔥 adds createdAt & updatedAt
  }
);

export default mongoose.model("User", userSchema);