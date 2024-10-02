require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const videoRoutes = require("./routes/videoRoutes");
const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

// Add these lines in server.js after initializing Express
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

// Add these routes in server.js
app.get("/", (req, res) => {
  res.render("index"); // Render the index page
});

app.get("/login", (req, res) => {
  res.render("login"); // Render the login page
});

app.get("/register", (req, res) => {
  res.render("register"); // Render the registration page
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard"); // Render the dashboard page
});

// Routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/videos", videoRoutes); // Video metadata routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
