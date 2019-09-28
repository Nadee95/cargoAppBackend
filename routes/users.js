const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

//Register
router.post("/register", (req, res, next) => {
  //res.send("REGISTER");
  let newUser = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({ success: false, msg: "Fail to register user." });
      console.log(err);
    } else {
      res.json({ success: true, msg: "User registered." });
    }
  });
});

//Profile
router.get("/profile", (req, res, next) => {
  res.send("PROFILE");
});

//Authenticate
router.get("/authenticate", (req, res, next) => {
  res.send("AUTHENTICATE");
});

//Validate
router.get("/validate", (req, res, next) => {
  res.send("VALIDATE");
});

module.exports = router;
