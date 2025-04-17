// routes/articleRoutes.js
const express = require('express');
const { addArticle, getArticles } = require('../controllers/ArticleController');
const router = express.Router();

router.post('/add', addArticle);
router.get('/', getArticles);

module.exports = router;
