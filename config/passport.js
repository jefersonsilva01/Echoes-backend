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

  User.findOne({ email: profile._json.email })
    .then(user => {
      if (user) return done(null, user);

      const chars = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        '@', '#', '$', '%', '&', '*', '/', '\\', '.',
        'A', 'a', 'B', 'b', 'C', 'c', 'D', 'd', 'E', 'e',
        'F', 'f', 'G', 'g', 'H', 'h', 'I', 'i', 'J', 'j',
        'K', 'k', 'L', 'l', 'M', 'm', 'N', 'n', 'O', 'o',
        'P', 'p', 'Q', 'q', 'R', 'r', 'S', 's', 'T', 't',
        'U', 'u', 'V', 'v', 'W', 'w', 'X', 'x', 'Y', 'y',
        'Z', 'z'
      ]

      let password = '';
      while (password.length < 8) {
        password += chars[Math.floor(Math.random() * chars.length)];
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      User.create(
        {
          googleID: profile.id,
          username: profile.displayName,
          email: profile._json.email,
          password: hashPass,
          imgPath: "./assets/avatar-cover.png",
          imgName: 'Avatar'
        }
      )
        .then(newUser => {
          done(null, newUser);
        })
        .catch(err => done(err));
    })
    .catch(err => done(err));
}))