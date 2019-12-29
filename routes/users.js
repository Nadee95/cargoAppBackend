const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation");

const User = require("../models/user");
const config = require("../config/database");

//Register
router.post("/register", async (req, res, next) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("email already exists.");

  let newUser = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  let addedUser = await User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({
        success: false,
        msg: "Fail to register user."
      });
      console.log(err);
    } else {
      res.send({ success: true, msg: "User registered.", addedUser });
    }
  });
});

//Profile
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    console.log("profile");
    res.json({ user: req.user });
  }
);

//login => authenticate
router.post("/login", async (req, res, next) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("email is not found.");

  const validPass = await User.checkPassword(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password.");

  const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
  res.header("auth_token", token).send();
});

//Authenticate
router.post("/authenticate", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: "User not found." });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 604800
        });

        res.json({
          success: true,
          token: "JWT " + token,
          user: {
            id: user._id,
            name: user.name,
            username: username,
            email: user.email
          }
        });
      } else {
        res.json({ success: false, msg: "Wrong Password." });
      }
    });
  });
});

module.exports = router;
