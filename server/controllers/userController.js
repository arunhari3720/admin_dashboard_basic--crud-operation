import bcrypt from "bcryptjs";
import User from "../models/User.js";

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
       const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

     const image = req.file ? req.file.filename : "";
    const user = await User.create({
      name,
      email,
      password,
      image
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// delete user 
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    await User.findByIdAndDelete(userId);

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//get user 
export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// UPDATE
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      req.body,
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};