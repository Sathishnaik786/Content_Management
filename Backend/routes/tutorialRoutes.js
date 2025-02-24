const express = require("express");
const {
  createTutorial,
  getTutorials,
  getTutorialById,
  updateTutorial,
  deleteTutorial,
} = require("../controllers/tutorialController");

const router = express.Router();

router.post("/", createTutorial);
router.get("/", getTutorials);
router.get("/:id", getTutorialById);
router.put("/:id", updateTutorial);
router.delete("/:id", deleteTutorial);

module.exports = router;
