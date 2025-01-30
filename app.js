require("dotenv").config();
const express = require('express');
const MongoStore = require("connect-mongo");
const session = require("express-session");
const passport = require('passport');
const flash = require('connect-flash');
const bodyParser = require('body-parser');

require("./config/passport");
require("./db");

const app = express();
require("./config")(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || "secret key",
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI || "mongodb://localhost:27017/echoes",
  }),
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth/index');
const apiRouter = require('./routes/api');

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/api', apiRouter);

require("./error-handling")(app);

module.exports = app;
