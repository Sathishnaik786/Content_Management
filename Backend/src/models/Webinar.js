const mongoose = require("mongoose");

const webinarSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    date: { type: Date, required: true, index: true },
    link: { 
      type: String, 
      required: true, 
      match: [/^(https?:\/\/[^\s$.?#].[^\s]*)$/, "Invalid URL format"] 
    },
    host: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    status: { 
      type: String, 
      enum: ["Scheduled", "Completed", "Cancelled"], 
      default: "Scheduled" 
    }
  },
  { timestamps: true } // Adds createdAt & updatedAt automatically
);

module.exports = mongoose.model("Webinar", webinarSchema);
