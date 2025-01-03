const express = require("express");
const logger = require("morgan");
const flash = require('connect-flash');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const socialLogin = require("../models/SocialLogin.model");
const passport = require("passport");

const FRONTEND_URL = process.env.ORIGIN || "http://localhost:3000";

module.exports = (app) => {
  app.set("trust proxy 1");

  app.use(logger('dev'));

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use(express.static(path.join(__dirname, 'public')));

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
        mongoUrl: process.env.MONGO_URI_DEPLOY
        // mongoUrl: process.env.MONGO_URI || "mongodb://localhost:27017/echoes",
      })
    })
  );

  passport.serializeUser((user, callback) => {
    callback(null, user._id);
  });

  passport.deserializeUser((req, id, callback) => {
    socialLogin.findById(id)
      .then(user => {
        if (user) {
          req.session.currentUser = user.toObject();
        }
        callback(null, user);
      })
      .catch(error => {
        callback(error);
      });
  });

  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // callbackURL: "https://quadra-steel.vercel.app/auth/google/callback",
    // callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true
  }, (request, accessToken, refreshToken, profile, done) => {
    if (profile.error) {
      console.error("Error retrieving Google profile:", profile.error);
      done(profile.error);
      return;
    }

    socialLogin.findOne({ googleID: profile.id })
      .then(user => {
        if (user) {
          return done(null, user);
        }

        socialLogin.create(
          {
            username: profile.displayName,
            googleID: profile.id,
            status: "Active",
            imgPath: "./assets/avatar-cover.jpg",
            imgName: 'Avatar',
            email: profile._json.email
          }
        )
          .then(newUser => {
            done(null, newUser);
          })
          .catch(err => done(err));
      })
      .catch(err => done(err));
  }))

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(flash());
};