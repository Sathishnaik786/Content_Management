const mongoose = require("mongoose");

const tutorialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tags: [String],
  status: { type: String, enum: ["Draft", "Published"], default: "Draft" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Tutorial", tutorialSchema);
