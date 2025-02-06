var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Echoes' });
});

router.get("/test-session", (req, res) => {
  if (!req.session.visits) {
    req.session.visits = 1;
  } else {
    req.session.visits++;
  }

  res.json({ visits: req.session.visits });
});

module.exports = router;
