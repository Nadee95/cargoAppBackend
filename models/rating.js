const mongoose = require("mongoose");
const config = require("../config/database");
const Driver = require("../models/driver");
const User = require("../models/user");

const user_id = User.ObjectId;
const driver_id = Driver.ObjectId;

const ratingSchema = mongoose.Schema({
  time: { type: date },
  rating_count: { type: Number },
  rating: { type: Number },
  driver_id: driver_id,
  user_id: user_id
});
