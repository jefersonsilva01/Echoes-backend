const express = require('express');
const axios = require('axios');
const User = require("../models/User.model");
const Article = require("../models/Article.model");
const Bookmark = require("../models/Bookmark.model");
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

  if (update.bookmarks && update.add) {
    User.findByIdAndUpdate(id,
      {
        $addToSet: { bookmarks: update.bookmarks }
      },
      {
        new: true, runValidators: true
      }
    )
      .then(response => res.json(response))
      .catch(error => res.json(error));
  } else if (update.bookmarks && update.remove) {
    User.findByIdAndUpdate(id,
      {
        $pull: { bookmarks: update.bookmarks }
      },
      {
        new: true, runValidators: true
      }
    )
      .then(response => res.json(response))
      .catch(error => res.json(error));
  } else if (update.addLike) {
    User.findByIdAndUpdate(id,
      {
        $addToSet: { likes: update.addLike }
      },
      {
        new: true, runValidators: true
      }
    )
      .then(response => res.json(response))
      .catch(error => res.json(error));
  } else if (update.removeLike) {
    User.findByIdAndUpdate(id,
      {
        $pull: { likes: update.removeLike }
      },
      {
        new: true, runValidators: true
      }
    )
      .then(response => res.json(response))
      .catch(error => res.json(error));
  } else {
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
  }
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
});

router.post("/new-article", async (req, res, next) => {
  const article = { ...req.body }, { id } = req.query;

  if (!article.title || !article.description || !article.paragraph) {
    res.status(400).json({
      message: "Provide Title, Description and Paragraph"
    });
    return;
  }

  try {
    if (!article.cover) {
      const response = await axios.get("https://picsum.photos/766/638", {
        responseType: 'arraybuffer',
      });

      article.cover = response.request.res.responseUrl;
    }

    const newArticle = new Article({
      userId: id,
      article,
    });

    const savedArticle = await newArticle.save();
    res.status(200).json(savedArticle);

  } catch (error) {
    console.error('Error fatching image or save article: ', error);
    res.status(500).json({
      message: 'An error occured',
      error: error.message
    });
  }
});

router.get("/my-articles", (req, res, next) => {
  const { id } = req.query;

  if (!id) {
    res.status(400).json({
      message: "Articles not found"
    });
    return;
  }

  Article.find({ userId: id })
    .then(articles => {
      articles.length > 0 ? res.json(articles) : null;
    })
    .catch(err => res.json(err));
});

router.put("/update-article", (req, res, next) => {
  const update = { ...req.body }, { id } = req.query

  if (update.bookmark) {
    Article.findByIdAndUpdate(id,
      {
        $inc: { bookmarks: 1 }
      },
      {
        new: true, runValidators: true
      }
    )
      .then(response => {
        res.json(response)
      })
      .catch(error => {
        res.json(error)
      });
  } else if (update.unBookmark) {
    Article.findByIdAndUpdate(id,
      {
        $inc: { bookmarks: -1 }
      },
      {
        new: true, runValidators: true
      }
    )
      .then(response => {
        res.json(response)
      })
      .catch(error => {
        res.json(error)
      });
  } else if (update.like === "add") {
    Article.findByIdAndUpdate(id,
      {
        $inc: { likes: 1 }
      },
      {
        new: true, runValidators: true
      }
    )
      .then(response => {
        res.json(response)
      })
      .catch(error => {
        res.json(error)
      });
  } else if (update.like === "remove") {
    Article.findByIdAndUpdate(id,
      {
        $inc: { likes: -1 }
      },
      {
        new: true, runValidators: true
      }
    )
      .then(response => {
        res.json(response)
      })
      .catch(error => {
        res.json(error)
      });
  } else {
    Article.findByIdAndUpdate(id,
      {
        $set: { article: update }
      },
      {
        new: true, runValidators: true
      }
    )
      .then(response => res.json(response))
      .catch(error => res.json(error));
  }
});

router.delete("/article/delete", (req, res, next) => {
  const { id } = req.query;

  Article.findByIdAndDelete({ _id: id })
    .then(response => res.json(response))
    .catch(error => console.log(error));
});

router.post("/new-bookmark", (req, res, next) => {
  const { name } = req.body, { id } = req.query;

  if (!name) {
    res.status(400).json({
      message: "Provide an name"
    });
    return;
  }

  const newBookmark = new Bookmark({
    userId: id,
    name,
  });

  newBookmark.save()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      console.error('Error fatching image or save article: ', err);
      res.status(500).json({
        message: 'An error occured',
        error: err.message
      });
    });
});

router.get("/bookmarks", (req, res, next) => {
  const { id } = req.query;

  if (!id) {
    res.status(400).json({
      message: "Not found"
    });
    return;
  }

  Bookmark.find({ userId: id })
    .then(bookmarks => {
      bookmarks.length > 0 ? res.json(bookmarks) : res.json([]);
    })
    .catch(err => res.json(err));

});

router.put('/update-bookmark', (req, res, next) => {
  const update = { ...req.body }, { id } = req.query;

  if (update.name) {
    Bookmark.findByIdAndUpdate(id,
      {
        $set: { name: update.name }
      },
      {
        new: true, runValidators: true
      }
    )
      .then(response => res.json(response))
      .catch(error => res.json(error));
  }

  if (update.article && update.add) {
    Bookmark.findByIdAndUpdate(id,
      {
        $addToSet: { articles: update.article }
      },
      {
        new: true, runValidators: true
      }
    )
      .then(response => res.json(response))
      .catch(error => res.json(error));
  } else if (update.article && update.remove) {
    Bookmark.findOne({ articles: { $in: [update.article] } })
      .then(response => {
        const id = response._id;
        Bookmark.findByIdAndUpdate(id,
          {
            $pull: { articles: update.article }
          },
          {
            new: true, runValidators: true
          }
        )
          .then(response => {
            res.json(response)
          })
          .catch(error => res.json(error));
      })
      .catch(error => res.json(error));
  }
});

router.delete("/bookmark/delete", (req, res, next) => {
  const { id } = req.query;

  if (!id) {
    res.status(400).json({
      message: "Bad request!"
    });
    return;
  }

  Bookmark.findByIdAndDelete({ _id: id })
    .then(response => res.json(response))
    .catch(error => console.log(error));
});

module.exports = router;
