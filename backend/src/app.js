// this file create create server
const express = require("express");
const authRoutes = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");
const foodRoutes = require("./routes/food.routes");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.json({"message": "server is working"});
} )

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);

module.exports = app;