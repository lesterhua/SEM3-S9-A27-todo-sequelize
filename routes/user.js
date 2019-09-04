const express = require("express");
const router = express.Router();
const passport = require("passport");
const db = require("../models");
const User = db.User;
const bcrypt = require('bcryptjs')

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login"
  })(req, res, next);
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  User.findOne({ where: { email: email } }).then(user => {
    if (user) {
      console.log("User ready exists");
      res.render("register", {
        name,
        email,
        password,
        password2
      });
    } else {
      const newUser = new User({
        name,
        email,
        password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash

          newUser
            .save()
            .then(user => {
              res.redirect("/users/login");
            })
            .catch(err => console.log(err));
        })
      })
    }
  });
});

router.get("/logout", (req, res) => {
  req.logout()
  res.redirect('/users/login')
});

module.exports = router;
