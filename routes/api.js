const express = require('express');
const User = require("../models/User.model");
const Article = require("../models/Article.model");
const bcrypt = require("bcryptjs");
const uploader = require("../config/cloudinary.config");
const router = express.Router();

/* GET users listing. */
router.put('/user', (req, res, next) => {
  const { id } = req.query;
  const update = { ...req.body };

  if (update.password) {
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(update.password, salt);

    update.password = hashPass;
  }

  User.findByIdAndUpdate(id,
    {
      $set: { ...update }
    },
    {
      new: true, runValidators: true
    }
  )
    .then(response => res.json(response))
    .catch(error => res.json(error));
});

router.post("/upload", uploader.single("image"), (req, res, next) => {
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }

  res.json({ secure_url: req.file.path });
});

router.delete("/user/delete", (req, res, next) => {
  const { id } = req.query;

  User.findByIdAndDelete({ _id: id })
    .then(response => res.json(response))
    .catch(error => console.log(error));
})

router.post("/new-article", (req, res, next) => {
  const article = { ...req.body }, { id } = req.query;

  article.cover ? "" : article.cover = "https://picsum.photos/"

  if (!article.title || !article.description || !article.paragraph) {
    res.status(400).json({
      message: "Provide Title, Description and Paragraph"
    });
    return;
  }

  const newArticle = new Article({
    userId: id,
    article,
  });

  newArticle.save(err => {
    if (err) {
      res.status(400).json({
        message: "Saving to database went wrong."
      });
      return;
    }

    res.status(200).json(newArticle);
  });
});

router.get("/my-articles", (req, res, next) => {
  const { id } = req.query;

  if (!id) {
    res.status(400).json({
      message: "User not found"
    });
    return;
  }

  Article.find({ userId: id })
    .then(articles => {
      articles.length > 0 ? res.json(articles) : null;
    })
    .catch(err => res.json(err));
});

router.delete("/article/delete", (req, res, next) => {
  const { id } = req.query;

  Article.findByIdAndDelete({ _id: id })
    .then(response => res.json(response))
    .catch(error => console.log(error));
})

module.exports = router;
