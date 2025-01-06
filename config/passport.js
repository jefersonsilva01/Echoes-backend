const User = require('../models/User.model');
const socialLogin = require("../models/SocialLogin.model");
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
    console.log("Email recebido:", email);
    console.log("Password recebido:", password);

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
  // callbackURL: "https://echoes-backend.vercel.app/auth/google/callback",
  callbackURL: "http://localhost:5000/auth/google/callback",
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