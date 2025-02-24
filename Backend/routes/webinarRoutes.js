const express = require("express");
const { createWebinar, getWebinars } = require("../controllers/webinarController");

const router = express.Router();

router.post("/", createWebinar);
router.get("/", getWebinars);

module.exports = router;
