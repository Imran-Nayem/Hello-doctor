require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const app = express();
const cookieParser = require('cookie-parser');
const chatRoutes = require("./routes/chat.routes");

app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
// Serve uploaded files under /images path
app.use('/images', express.static('public'))

// Health check
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/auth", authRoutes);


connectDB();
app.listen(3000, () => console.log("Server running on port 3000"));
