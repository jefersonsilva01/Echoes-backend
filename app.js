require("dotenv").config();
const express = require('express');
const MongoStore = require("connect-mongo");
const session = require("express-session");
const passport = require('passport');
const flash = require('connect-flash');

require("./config/passport");
require("./db");

const app = express();
require("./config")(app);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret key",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      // mongoUrl: process.env.MONGO_URI_DEPLOY
      mongoUrl: process.env.MONGO_URI || "mongodb://localhost:27017/echoes",
    })
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth/index');
// const usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/auth', authRouter);
// app.use('/users', usersRouter);

require("./error-handling")(app);

module.exports = app;
