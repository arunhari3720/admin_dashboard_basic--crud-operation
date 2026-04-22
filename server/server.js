const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

// Local files
const connectDB = require("./config/db");
const createSuperAdmin = require("./utils/createSuperAdmin");

const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/taskRoutes");
const bikeRoutes = require("./routes/bikeRoutes");
const productRoutes = require("./routes/productRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const carRoutes = require("./routes/carRoutes");
const offerRoutes = require("./routes/offerRoutes");
const priceRoutes = require("./routes/priceRoutes");
const salesRoutes = require("./routes/salesRoutes");
const logoRoutes = require("./routes/logoRoutes");

dotenv.config();

const app = express();

// Create HTTP server
const server = http.createServer(app);

// Setup Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Make io accessible in routes
app.set("io", io);

// Socket connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

app.use(cors());
app.use(express.json());

// Static folder
app.use("/uploads", express.static("uploads"));

// Test route
app.get("/", (req, res) => {
  res.send("API running...");
});

console.log("logoRoutes:", typeof logoRoutes);
// ================= ROUTES =================
app.use("/api", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/bikes", bikeRoutes);
app.use("/api/products", productRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/final-price", priceRoutes);
app.use("/api", salesRoutes);
app.use("/api/logo", logoRoutes);

// ================= START SERVER =================
const startServer = async () => {
  try {
    await connectDB();

    // Create Super Admin
    await createSuperAdmin();

    server.listen(5000, () => {
      console.log("Server running on port 5000 🚀");
    });
  } catch (error) {
    console.log("Server error:", error);
  }
};

startServer();