const mongoose = require("mongoose");

const webinarSchema = new mongoose.Schema({
  title: String,
  date: Date,
  duration: Number, // in minutes
  link: String, // Webinar hosting link
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Webinar", webinarSchema);
