const mongoose = require("mongoose");

const guideSchema = new mongoose.Schema({
  title: String,
  steps: [String], // Step-by-step tutorial
  tags: [String],
  published: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Guide", guideSchema);
