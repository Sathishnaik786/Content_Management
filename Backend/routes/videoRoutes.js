const express = require("express");
const { createVideo, getVideos } = require("../controllers/videoController");

const router = express.Router();

router.post("/", createVideo);
router.get("/", getVideos);

module.exports = router;
