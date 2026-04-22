const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ================= REGISTER =================
const register = async (req, res) => {
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
      role: "user",
    });

    await user.save();

    res.json({ message: "User registered successfully ✅" });
  } catch (err) {
    console.log("REGISTER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// ================= LOGIN =================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing credentials ❌" });
    }

    const normalizedEmail = email.toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(400).json({ message: "User not found ❌" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

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

    const roleMessages = {
      superadmin: "Super Admin login successful 👑",
      admin: "Admin login successful 🧑‍💼",
      hr: "HR login successful 🧑‍💻",
      user: "User login successful 👤",
    };

    res.json({
      message: roleMessages[role] || "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role,
        avatar: user.avatar || `https://i.pravatar.cc/150?u=${user.email}`,
      },
    });
  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error ❌" });
  }
};

// ================= CREATE SUPER ADMIN =================
const createSuperAdmin = async (req, res) => {
  try {
    const { name, email, password, secret } = req.body;

    if (secret !== process.env.SUPER_ADMIN_SECRET) {
      return res.status(403).json({ msg: "Unauthorized ❌" });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashed,
      role: "superadmin",
    });

    res.json({
      msg: "Super Admin created ✅",
      user,
    });
  } catch (err) {
    console.log("SUPERADMIN ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  register,
  login,
  createSuperAdmin,
};