const Video = require("../models/Video");

// Get all videos
exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find().populate("user", "name email");
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single video
exports.getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate("user", "name email");
    if (!video) return res.status(404).json({ message: "Video not found" });
    res.json(video);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create video
exports.createVideo = async (req, res) => {
  try {
    const { title, description, videoUrl, tags } = req.body;
    const newVideo = new Video({
      title,
      description,
      videoUrl,
      tags,
      user: req.user.id // From authentication middleware
    });

    const savedVideo = await newVideo.save();
    res.status(201).json(savedVideo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update video
exports.updateVideo = async (req, res) => {
  try {
    const updatedVideo = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedVideo) return res.status(404).json({ message: "Video not found" });
    res.json(updatedVideo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete video
exports.deleteVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });
    res.json({ message: "Video deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
