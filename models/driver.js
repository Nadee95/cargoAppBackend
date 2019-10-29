const mongoose = require("mongoose");
const config = require("../config/database");
const User = require("../models/user");

const driverScheema = mongoose.Schema({
  user_Id: mongoose.Schema.Types.ObjectId,
  licence_no: { type: String, require: true },
  age: { type: Number, require: true }
  //rating
});

const Driver = (module.exports = mongoose.model("Driver", driverSchema));
