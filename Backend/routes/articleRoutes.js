const express = require("express");
const { createArticle, getArticles } = require("../controllers/articleController");

const router = express.Router();

router.post("/", createArticle);
router.get("/", getArticles);

module.exports = router;
