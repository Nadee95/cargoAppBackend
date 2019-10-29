const mongoose = require("mongoose");
const User = require("../models/user");
const Driver = require("../models/driver");

//const objectID = mongoose.Schema.Types.ObjectId;

const user_id = User.ObjectId;
const driver_id = Driver.ObjectId;

const bid_Schema = mongoose.Schema({
  userID: user_id,
  description: { type: String, require: true },
  photo: [URL],
  due_time: { type: Date },
  vehicle_type: { type: String },
  start_location: {
    type: "Point",
    coordinates: [{ lon: { type: float } }, { lon: { type: float } }] //syntax ?
  },
  destination_location: {
    type: "Point",
    coordinates: [{ lon: { type: float } }, { lon: { type: float } }] //syntax ?
  },
  driver: driver_id //accepted driver
});

const Bid = (module.exports = mongoose.model("Bid", bid_Schema));
