import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing fields ❌" });
    }

    const normalizedEmail = email.toLowerCase();

    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists) {
      return res.status(400).json({ message: "User already exists ❌" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      address,
      role: "user"
    });

    await user.save();

    res.json({ message: "User registered successfully ✅" });

  } catch (err) {
    console.log("REGISTER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    console.log("REQ BODY:", req.body); // 🔥 debug

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing credentials ❌" });
    }

    const normalizedEmail = email.toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });
    console.log("USER:", user); // 🔥 debug

    if (!user) {
      return res.status(400).json({ message: "User not found ❌" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("PASSWORD MATCH:", isMatch); // 🔥 debug

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password ❌" });
    }

    const role = (user.role || "user").toLowerCase();

    const expiresIn =
      role === "superadmin" || role === "admin"
        ? process.env.JWT_ADMIN_EXPIRE || "7d"
        : process.env.JWT_USER_EXPIRE || "1h";

    const token = jwt.sign(
      { id: user._id, role },
      process.env.JWT_SECRET,
      { expiresIn }
    );

    let loginMessage = "";

    if (role === "superadmin") {
      loginMessage = "Super Admin login successful 👑";
    } else if (role === "admin") {
      loginMessage = "Admin login successful 🧑‍💼";
    } else if (role === "hr") {
      loginMessage = "HR login successful 🧑‍💻";
    } else {
      loginMessage = "User login successful 👤";
    }

    res.json({
      message: loginMessage,
      token,
      user: {
        name: user.name,
        email: user.email,
        role
      }
    });

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error ❌" });
  }
});


// ================= CREATE SUPER ADMIN =================
router.post("/create-superadmin", async (req, res) => {
  try {
    const { name, email, password, secret } = req.body;

    if (secret !== process.env.SUPER_ADMIN_SECRET) {
      return res.status(403).json({
        msg: "Unauthorized ❌"
      });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({
        msg: "User already exists"
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashed,
      role: "superadmin"
    });

    res.json({
      msg: "Super Admin created ✅",
      user
    });

    console.log("Entered Password:", password);
    console.log("Stored Hash:", user.password)

  } catch (err) {
    console.log("SUPERADMIN ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;