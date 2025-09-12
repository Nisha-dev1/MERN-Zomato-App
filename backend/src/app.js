const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Routes
const authRoutes = require("./routes/auth.routes");
const foodRoutes = require("./routes/food.routes");

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Server is working" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);

app.use(cors({
  origin: "http://localhost:5173",  // ✅ frontend URL
  credentials: true
}));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
module.exports = app;