const mongoose = require("mongoose");
const User = require("../models/user");
const Driver = require("../models/driver");

//const objectID = mongoose.Schema.Types.ObjectId;

const user_id = User.ObjectId;
const driver_id = Driver.ObjectId;

const bid_Schema = mongoose.Schema({
  userID: user_id,
  placed_time: { type: Date, require: true },
  bid_value: { type: Number, require: true },
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

  bids: [{ driver: driver_id, placed_value: Number, placed_time: Date }],

  driver: driver_id //accepted driver
});

const Bid = (module.exports = mongoose.model("Bid", bid_Schema));
