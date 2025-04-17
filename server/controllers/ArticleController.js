// controllers/articleController.js
const Article = require('../models/articleModel');

exports.addArticle = async (req, res) => {
  try {
    const newArticle = await Article.create(req.body);
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
