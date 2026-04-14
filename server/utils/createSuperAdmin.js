import User from "../models/User.js";
import bcrypt from "bcryptjs";

const createSuperAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({
      email: process.env.SUPER_ADMIN_EMAIL
    });

    if (existingAdmin) {
      console.log("✅ Super Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(
      process.env.SUPER_ADMIN_PASSWORD,
      10
    );

    await User.create({
      name: "Super Admin",
      email: process.env.SUPER_ADMIN_EMAIL,
      password: hashedPassword,
      role: "superadmin"
    });

    console.log("🔥 Super Admin created");
  } catch (error) {
    console.log("Error creating super admin:", error);
  }
};

export default createSuperAdmin;