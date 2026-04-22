const express = require("express");
const {
  registerUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ================= REGISTER =================
router.post("/register", upload.single("image"), registerUser);

// ================= PROTECTED ROUTES =================

// Get all users
router.get("/", authMiddleware, getUsers);

// Update user
router.put("/:id", authMiddleware, updateUser);

// Delete user
router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;