const express = require("express");
const Webinarrouter = express.Router();
const {
  getWebinars,
  getWebinarById,
  createWebinar,
  updateWebinar,
  deleteWebinar,
} = require("../controllers/webinarController");
// const { protect } = require("../middleware/authMiddleware");

// Get all webinars (consider adding pagination, filtering, sorting)
Webinarrouter.get("/", getWebinars);

// Get a single webinar by ID
Webinarrouter.get("/:id", getWebinarById);

// Create a new webinar (Protected route)
Webinarrouter.post("/", createWebinar);

// Update a webinar (Protected route, only host or admin should update)
Webinarrouter.put("/:id", updateWebinar);

// Delete a webinar (Protected route, only host or admin should delete)
Webinarrouter.delete("/:id", deleteWebinar);

module.exports = Webinarrouter;
