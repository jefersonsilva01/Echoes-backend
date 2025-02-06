require("dotenv").config();
const express = require('express');
const passport = require('passport');
const flash = require('connect-flash');
const bodyParser = require('body-parser');

require("./config/passport");
require("./db");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require("./config")(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
