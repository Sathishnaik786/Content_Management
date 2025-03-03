const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  count: { type: Number, default: 0 },
  date: { type: Date, default: Date.now }
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
