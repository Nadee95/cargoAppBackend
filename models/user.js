const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../config/database");

//user schema
const userSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  phone: {
    type: Array
  },
  password: {
    type: String,
    required: true
  },
  imgURL: { url: { type: String }, filename: String },
  role: { type: Number, default: 0 },
  dateRegistered: { type: Date, default: Date.now }
});

const User = (module.exports = mongoose.model("User", userSchema));

module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
};

module.exports.checkEmail = function (query) {
  return User.findOne(query);
};
module.exports.checkPassword = function (reqPass, pass) {
  return bcrypt.compare(reqPass, pass);
};

module.exports.getUserByUsername = function (username, callback) {
  const query = { username: username };
  User.findOne(query, callback);
};

module.exports.addUser = function (newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
  return newUser;
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};
