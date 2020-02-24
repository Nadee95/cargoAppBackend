const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation");
const app = require("../app");
//  const verify = require("./routes/verifyToken");

const User = require("../models/user");
const config = require("../config/database");
const multer = require("multer");
const fs = require("fs");
const del = require("del");
const path = require("path");

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
    password: req.body.password,
    phone: req.body.phone
  });

  let addedUser = await User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({
        success: false,
        msg: "Fail to register user."
      });
      console.log(err);
    } else {
      res.send({ success: true, msg: "User registered.", addedUser }); //filtr user obj
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

//login => authenticate //using....
router.post("/login", async (req, res, next) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("email is not found.");

  const validPass = await User.checkPassword(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password.");

  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.SECRET_KEY,
    {
      expiresIn: 604800
    }
  );
  try {
    res
      .json({
        success: true,
        token: token
        //token: "JWT " + token
      })
      .send();
    //res.header("auth_token", token).send();
  } catch (error) {
    console.log(error);
  }
});

//Authenticate //username and email
router.post("/authenticate", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  // const user = await User.findOne({ email: req.body.email });
  // if (!user) return res.status(400).send("email is not found.");

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

//getAll users
router.get("/allUsers", (req, res, next) => {
  User.find({}, '-__v -password', (error, users) => {
    if (error) {
      return next(error);
    } else {
      res.json(users).send();
    }
  });
});

// get drivers
router.get("/allDrivers", (req, res, next) => {
  User.find({ role: "1" }, '-__v -password', (error, users) => {
    if (error) {
      return next(error);
    } else {
      res.json(users).send();
    }
  });
});
//

//add driver
router.put("/addDriver", async (req, res, next) => {
  // const user = await User.findOne({ email: req.body.email });
  // if (!user) return res.status(400).send("email is not found.");
  console.log(req.body._id);
  if (!req.body._id) {
    return res.status(400).send({
      message: "Note content can not be empty"
    });
  }
  User.findByIdAndUpdate(req.body._id, { role: "1" }, { new: true })
    .then(updatedUser => {
      if (!updatedUser) {
        return res.status(404).send({
          message: "user not found with id " + req.body._Id
        });
      }
      res.send(updatedUser);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "user not found with id " + req.body._Id
        });
      }
      return res.status(500).send({
        message: "Error updating user with id " + req.body._Id
      });
    });
});

//image crud functions

const UPLOAD_PATH = "uploads/";
// exports.UPLOAD_PATH = UPLOAD_PATH;

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_PATH);
  },
  filename: function (req, file, cb) {
    cb(null, req.body._Id + "-" + Date.now() + path.extname(file.originalname));
  }
});

let upload = multer({ storage: storage });
// exports.upload = upload;

router.post("/dpImage", upload.single('image'), (req, res, next) => {
  console.log("received ", req.body._Id);
  let url = req.protocol + "://" + req.get("host") + "/users/dpImage/" + req.body._Id;
  User.findByIdAndUpdate(req.body._Id, { imgURL: { url: url, filename: req.file.filename } }, { new: true })
    .then(updatedUser => {
      if (!updatedUser) {
        return res.status(404).send({
          message: "user not found with id " + req.body._Id
        });
      }
      res.send(updatedUser);//should not send
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "user not found with id " + req.body._Id
        });
      }
      return res.status(500).send({
        message: "Error updating user with id " + req.body._Id
      });
    });
});

router.get("/dpImage/:_Id", (req, res, next) => {


  User.findById(req.params._Id, (err, user) => {
    if (err) {
      return res.status(404).send({
        message: "user not found with id " + req.params._Id
      });
    }
    if (user) {
      res.setHeader('Content-Type', 'image/jpeg');
      fs.createReadStream(path.join(UPLOAD_PATH, user.imgURL.filename)).pipe(res);
    }
  });
});

router.delete("/dpImage/:_Id", (req, res, next) => {
  User.findByIdAndRemove(req.params._Id, (err, user) => {
    if (err) {
      return res.status(404).send({
        message: "user not found with id " + req.params._Id
      });
    }
    if (user) {
      del([path.join(UPLOAD_PATH, user.imgURL.filename)]).then(deleted => {
        return res.status(200).send({
          message: "image deleted!"
        });
      });
    } else {
      return res.status(404).send({
        message: "image not found with id " + req.params._Id
      });
    }

  });
});

module.exports = router;
