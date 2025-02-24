const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const articleRoutes = require("./routes/articleRoutes");
const videoRoutes = require("./routes/videoRoutes");
const guideRoutes = require("./routes/guideRoutes");
const webinarRoutes = require("./routes/webinarRoutes");
const tutorialRoutes = require("./routes/tutorialRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ✅ Use Routes
app.use("/api/articles", articleRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/guides", guideRoutes);
app.use("/api/webinars", webinarRoutes);
app.use("/api/tutorials", tutorialRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
