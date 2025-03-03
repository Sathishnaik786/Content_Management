const Article = require("../models/Article");

// Get all articles
exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Create new article
exports.createArticle = async (req, res) => {
  try {
    const { title, description, content, imageUrl, author } = req.body;
    const newArticle = new Article({ title, description, content, imageUrl, author });
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update article
exports.updateArticle = async (req, res) => {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedArticle);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete article
exports.deleteArticle = async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
