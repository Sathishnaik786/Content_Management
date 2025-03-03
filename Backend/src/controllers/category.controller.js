const Category = require("../models/category.model");

// Fetch categories based on filters
const getCategories = async (req, res) => {
  try {
    const { type } = req.query;
    const query = type ? { type } : {};
    const categories = await Category.find(query);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Add new category data
const addCategory = async (req, res) => {
  try {
    const { type, name, count } = req.body;
    const newCategory = new Category({ type, name, count });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: "Failed to add category" });
  }
};

module.exports = { getCategories, addCategory };
