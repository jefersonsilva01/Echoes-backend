var express = require('express');
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const uploader = require("../config/cloudinary.config");
var router = express.Router();

/* GET users listing. */
router.put('/user', (req, res, next) => {
  const { id } = req.query;
  const update = { ...req.body };

  console.log("update:", update);

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

module.exports = router;
