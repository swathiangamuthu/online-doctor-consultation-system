// controllers/articleController.js
const Article = require('../models/articleModel');
const User = require('../models/userModel');
const { sendNewArticleLaunchEmail } = require('../utils/email');

exports.addArticle = async (req, res) => {
  try {
    const newArticle = await Article.create(req.body);


    const user = await User.find();



    user.map(async(user) => {


       await sendNewArticleLaunchEmail(user.email,newArticle);

     
    });


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
