require("dotenv").config();

const User = require('../models/User.model');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcryptjs');
const passport = require('passport');

passport.serializeUser((loggedInUser, cb) => {
  cb(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, cb) => {
  User.findById(userIdFromSession, (err, userDocument) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, userDocument);
  });
});

passport.use(new LocalStrategy(
  { usernameField: 'email', passwordField: 'password' },
  (email, password, next) => {
    User.findOne({ email }, (err, foundUser) => {
      if (err) {
        next(err);
        return;
      }

      if (!foundUser) {
        next(null, false, { message: 'Incorrect e-mail.' });
        return;
      }

      if (!bcrypt.compareSync(password, foundUser.password)) {
        next(null, false, { message: 'Incorrect password.' });
        return;
      }

      next(null, foundUser);
    });
  }));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL || "http://localhost:5000/auth/google/callback",
  passReqToCallback: true
}, (request, accessToken, refreshToken, profile, done) => {
  if (profile.error) {
    console.error("Error retrieving Google profile:", profile.error);
    done(profile.error);
    return;
  }

  User.findOne({ googleID: profile.email })
    .then(user => {
      console.log("user:", user);
      if (user) {
        return done(null, user);
      }

      User.create(
        {
          username: profile.displayName,
          googleID: profile.id,
          imgPath: "./assets/avatar-cover.png",
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