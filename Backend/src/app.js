const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const connectDB = require("./config/db");

// Import Routes
const  ArticlesRouter = require("./routes/articleRoutes");
const videoRoutes = require("./routes/videoRoutes");
const tutorialRoutes = require("./routes/tutorialRoutes");
const webinarRoutes = require("./routes/webinarRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/articles",  ArticlesRouter);
app.use("/api/videos", videoRoutes);
app.use("/api/tutorials", tutorialRoutes);
app.use("/api/webinars", webinarRoutes);


// Error Handling
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message || "Server Error" });
});

module.exports = app;
