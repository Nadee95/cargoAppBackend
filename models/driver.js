const mongoose = require("mongoose");
const config = require("../config/database");
const User = require("../models/user");

//const user_id = User.ObjectId;

const ObjectId = mongoose.Schema.Types.ObjectId;

const driverSchema = mongoose.Schema({
  user_Id: ObjectId,
  licence_no: { type: String, require: true },
  age: { type: Number, require: true }
  //rating
});

// module.exports.addDriver = function (newDriver, callback) {
//   console.log(newDriver);
//   newDriver.save(callback)
//   return newDriver;
// };

const Driver = (module.exports = mongoose.model("Driver", driverSchema));
