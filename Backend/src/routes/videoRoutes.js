const express = require("express");
const Videoroute = express.Router();
const { getVideos, createVideo, updateVideo, deleteVideo } = require("../controllers/videoController");

// Routes
Videoroute.get("/", getVideos); // Fetch all videos
Videoroute.post("/", createVideo); // Create a video
Videoroute.put("/:id", updateVideo); // Update video
Videoroute.delete("/:id", deleteVideo); // Delete video

module.exports = Videoroute;
