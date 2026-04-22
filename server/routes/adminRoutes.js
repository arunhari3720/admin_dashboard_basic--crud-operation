const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// CREATE USER (MULTI-ROLE CONTROL)
router.post(
  "/create-user",
  authMiddleware,
  async (req, res) => {
    try {
      const { name, email, password, role } = req.body;

      const creatorRole = req.user.role;

      // ROLE PERMISSION RULES

      // Normal user cannot create anyone
      if (creatorRole === "user") {
        return res.status(403).json({
          msg: "Users cannot create accounts",
        });
      }

      // HR can only create users
      if (creatorRole === "hr" && role !== "user") {
        return res.status(403).json({
          msg: "HR can only create users",
        });
      }

      // Admin cannot create admin/superadmin
      if (
        creatorRole === "admin" &&
        (role === "admin" || role === "superadmin")
      ) {
        return res.status(403).json({
          msg: "Admin cannot create admin or superadmin",
        });
      }

      // Nobody can create superadmin
      if (role === "superadmin") {
        return res.status(403).json({
          msg: "Superadmin cannot be created from here",
        });
      }

      // Check existing user
      const existing = await User.findOne({ email });
      if (existing) {
        return res.status(400).json({ msg: "User already exists" });
      }

      // Hash password
      const hashed = await bcrypt.hash(password, 10);

      // Create user
      const user = await User.create({
        name,
        email: email.toLowerCase(),
        password: hashed,
        role: role.toLowerCase(),
      });

      res.json({
        msg: "User created successfully ✅",
        user,
      });
    } catch (error) {
      res.status(500).json({ msg: "Server error" });
    }
  }
);

module.exports = router;