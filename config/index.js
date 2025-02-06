require("dotenv").config();

const express = require("express");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const FRONTEND_URL = process.env.ORIGIN || "http://localhost:3000";

module.exports = (app) => {
  app.set("trust proxy", 1);

  app.use(
    cors({
      credentials: true,
      origin: [FRONTEND_URL]
    })
  );

  app.use(
    session({
      secret: process.env.SESSION_SECRET || "secret key",
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI || "mongodb://localhost:27017/echoes",
      }),
      cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
      }
    })
  );

  app.use(logger('dev'));
  app.use(cookieParser());
};