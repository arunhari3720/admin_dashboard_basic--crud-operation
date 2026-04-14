import express from "express";
import {
  registerUser,
  getUsers,
  updateUser,
  deleteUser
} from "../controllers/userController.js";

import upload from "../middleware/upload.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ================= REGISTER =================
router.post("/register", upload.single("image"), registerUser);

// ================= PROTECTED ROUTES =================

// 🔐 Get all users (only logged in)
router.get("/", authMiddleware, getUsers);

// 🔐 Update user (only logged in)
router.put("/:id", authMiddleware, updateUser);

// 🔐 Delete user (only logged in)
router.delete("/:id", authMiddleware, deleteUser);


export default router;