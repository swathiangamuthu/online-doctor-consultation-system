// models/article.js
const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Article', articleSchema);
