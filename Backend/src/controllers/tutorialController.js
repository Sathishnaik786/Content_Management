const Tutorial = require("../models/Tutorial");

// Get all tutorials
exports.getTutorials = async (req, res) => {
  try {
    const tutorials = await Tutorial.find().populate("author", "name email");
    res.json(tutorials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single tutorial
exports.getTutorialById = async (req, res) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id).populate("author", "name email");
    if (!tutorial) return res.status(404).json({ message: "Tutorial not found" });
    res.json(tutorial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create tutorial
exports.createTutorial = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const newTutorial = new Tutorial({
      title,
      content,
      tags,
      author: req.user.id // From authentication middleware
    });

    const savedTutorial = await newTutorial.save();
    res.status(201).json(savedTutorial);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update tutorial
exports.updateTutorial = async (req, res) => {
  try {
    const updatedTutorial = await Tutorial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTutorial) return res.status(404).json({ message: "Tutorial not found" });
    res.json(updatedTutorial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete tutorial
exports.deleteTutorial = async (req, res) => {
  try {
    const tutorial = await Tutorial.findByIdAndDelete(req.params.id);
    if (!tutorial) return res.status(404).json({ message: "Tutorial not found" });
    res.json({ message: "Tutorial deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
