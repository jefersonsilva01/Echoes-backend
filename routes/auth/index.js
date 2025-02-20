require("dotenv").config();
const router = require("express").Router();
const User = require("../../models/User.model");
const passport = require("passport");
const bcrypt = require("bcryptjs");

const isLoggedOut = (req, res, next) => {
  if (req.session.currentUser) res.redirect("/signin");

  next();
}

router.post("/signup", (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;

  if (!username || !email, !password, !confirmPassword) {
    res.status(400).json({
      message: "Provide username, e-mail, password, and confirm password"
    });
    return;
  }

  if (password.length < 8) {
    res.status(400).json({
      message: "Please make your password at last 8 characters long for security purpose."
    });
    return;
  }

  if (password !== confirmPassword) {
    res.status(400).json({
      message: "Please make password and confirm password are same."
    });
    return;
  }

  User.findOne({ email }, (err, foundUser) => {
    if (err) {
      res.status(500).json({
        message: "E-mail check went bad."
      });
      return;
    }

    if (foundUser) {
      res.status(400).json({
        message: "E-mail taken. Choose another one."
      });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashPass,
      imgPath: "./assets/avatar-cover.png",
      imgName: "Avatar"
    });

    newUser.save(err => {
      if (err) {
        res.status(400).json({
          message: "Saving use to database went wrong."
        });
        return;
      }

      req.login(newUser, (err) => {
        if (err) {
          res.status(500).json({
            message: 'Signin after signup went bad.'
          });
          return;
        }

        res.status(200).json(newUser);
      });
    });
  });
});

router.post("/signin", (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({
        message: "Something went wrong authenticate user"
      });
      return;
    }

    if (!theUser) {
      console.log(failureDetails);
      res.status(401).json(failureDetails);
      return;
    }

    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({
          message: "Session save went bad."
        });
        return;
      }

      res.status(200).json(theUser);
    });
  })(req, res, next);
});

router.get("/verify", (req, res, next) => {
  if (req.isAuthenticated()) {  // Verifica se o `req.user` está definido
    res.status(200).json(req.user);
  } else {
    res.status(403).json({ message: "Unauthorized" });  // Usuário não autenticado
  }
});

router.post("/signout", (req, res, next) => {
  req.session.destroy(err => { if (err) { res.status(500) } });
  req.logout(err => { if (err) return next(err) });
  res.status(200).json({ message: 'Log out succes!' });
});

router.get("/google", passport.authenticate("google", {
  scope: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"
  ]
}));

router.get("/google/callback", isLoggedOut,
  passport.authenticate("google", { failureRedirect: "/signin" }),
  (req, res) => {
    if (req.user) {
      req.session.currentUser = req.user.toObject();
      res.redirect(`${process.env.ORIGIN}?user=${JSON.stringify(req.user)}`);
    } else {
      res.redirect("/signin")
    }
  }
);

module.exports = router;  