const express = require("express");
const { createGuide, getGuides } = require("../controllers/guideController");

const router = express.Router();

router.post("/", createGuide);
router.get("/", getGuides);

module.exports = router;
