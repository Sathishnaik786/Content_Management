const express = require("express");
const Tutorialrouter = express.Router();
const {
  getTutorials,
  getTutorialById,
  createTutorial,
  updateTutorial,
  deleteTutorial,
} = require("../controllers/tutorialController");
// const { protect } = require("../middleware/authMiddleware");

Tutorialrouter.get("/", getTutorials);
Tutorialrouter.get("/:id", getTutorialById);
Tutorialrouter.post("/",  createTutorial);
Tutorialrouter.put("/:id",  updateTutorial);
Tutorialrouter.delete("/:id",  deleteTutorial);

module.exports = Tutorialrouter;
