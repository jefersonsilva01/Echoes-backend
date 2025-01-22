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

  article.cover ? "" : article.cover = "https://picsum.photos/650/178"

  if (!article.title || !article.description || !article.paragraph) {
    res.status(400).json({
      message: "Provide Title, Descriptio and Paragraph"
    });
    return;
  }

  const newArticle = new Article({
    article,
    userId: id
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

module.exports = router;
