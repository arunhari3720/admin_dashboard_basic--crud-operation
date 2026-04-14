import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import createSuperAdmin from "./utils/createSuperAdmin.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Static folder
app.use("/uploads", express.static("uploads"));

// ✅ Test route (ONLY for testing)
app.get("/", (req, res) => {
  res.send("API running...");
});

// ================= ROUTES =================
app.use("/api", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/admin", adminRoutes);

// ================= START SERVER =================
const startServer = async () => {
  try {
    await connectDB(); // ✅ connect DB first

    // 🔥 CREATE SUPER ADMIN HERE
    await createSuperAdmin();

    app.listen(5000, () =>
      console.log("Server running on port 5000 🚀")
    );
  } catch (error) {
    console.log("Server error:", error);
  }
};

startServer();