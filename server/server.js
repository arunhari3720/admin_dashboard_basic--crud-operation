import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import path from "path";


dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("API running...");
});

// user routes
app.use("/api/users", userRoutes);
app.use("/api/students",studentRoutes)
app.use("/uploads", express.static("uploads"));

app.listen(5000, () => console.log("Server running on port 5000"));