const mongoose = require("mongoose");

const User = require("../models/user");
const Driver = require("../models/driver");

const user_id = User.ObjectId;
const driver_id = Driver.ObjectId;

const transport_requestSchema = mongoose.Schema({
  user_id: user_id,
  cargo_type: { type: String, require: true },
  volume: { type: String, require: true },
  on_time: { type: Date, require: true, default: Date.now },
  due_time: { type: Date, require: true },
  user_location: {
    type: "Point",
    coordinates: [{ lon: { type: float } }, { lon: { type: float } }] //syntax ?
  },
  destination: {
    type: "Point",
    coordinates: [{ lon: { type: float } }, { lon: { type: float } }] //syntax ?
  },
  driver_id: driver_id
});
