const express = require("express");
const router = express.Router();
const passport = require("passport");
const db = require("../models");
const User = db.User;
const bcrypt = require('bcryptjs')

router.get("/login", (req, res) => {
  // create errors array
  let errors = []
  //getting message form passport and push to errors array
  errors.push({ message: req.flash('error')[0] })
  console.log(`errors:`, errors[0].message)
  //if errors no messages and render login page
  if (errors[0].message === undefined) {
    res.render("login");
    //if it has , and if message is Missing credentials , delete it , and then errors message render to login page 
  } else {
    if (errors[0].message === 'Missing credentials') {
      errors.splice(0, 1)
      console.log(errors[0])
    }
    res.render('login', { errors })
  }
});

router.post("/login", (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    req.flash("warning_msg", "所有欄位都是必填!");
  }
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;

  let errors = []

  if (!name || !email || !password || !password2) {
    errors.push({ message: '所有欄位都是必填' })
  }

  if (password != password2) {
    errors.push({ message: '密碼輸入不一致' })
  }
  // 再檢查是否還有errors
  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    })
  } else {
    User.findOne({ where: { email: email } }).then(user => {
      if (user) {
        errors.push({ message: '這個Email已經註冊過了' })
        console.log("User ready exists");
        res.render("register", {
          errors,
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
  }
});

router.get("/logout", (req, res) => {
  req.logout()
  req.flash('success_msg', '您己經成功登出')
  res.redirect('/users/login')
});

module.exports = router;
