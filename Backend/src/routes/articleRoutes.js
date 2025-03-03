const express = require("express");
const  ArticlesRouter = express.Router();
const {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/articleController");
// const { protect } = require("../middleware/authMiddleware"); // Ensure authentication middleware is available
const { checkObjectId } = require("../middleware/validateObjectId"); // Middleware for validating MongoDB ObjectId

// Routes for articles
ArticlesRouter.route("/")
  .get(getArticles)  // Get all articles (Public)
  .post(createArticle);  // Create a new article (Protected)

ArticlesRouter.route("/:id")
  .put( checkObjectId, updateArticle)  // Update an article (Protected)
  .delete( checkObjectId, deleteArticle);  // Delete an article (Protected)

// Export the router
module.exports = ArticlesRouter;
