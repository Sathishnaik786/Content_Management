require("dotenv").config(); // Load environment variables at the start

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

// Import Routes
const articleRoutes = require("./routes/articleRoutes");
const Videoroute = require("./routes/videoRoutes");
const Tutorialrouter = require("./routes/tutorialRoutes");
const Webinarrouter = require("./routes/webinarRoutes");
const Usersrouter = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/Content";

console.log("Connecting to MongoDB:", MONGO_URI); // Debugging log

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err);
    process.exit(1); // Exit process if MongoDB connection fails
  });

// Routes
app.use("/api/articles", articleRoutes);
app.use("/api/videos", Videoroute);
app.use("/api/tutorials", Tutorialrouter);
app.use("/api/webinars", Webinarrouter);
app.use("/api/users", Usersrouter);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.message);
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
