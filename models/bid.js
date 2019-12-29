const mongoose = require("mongoose");
const User = require("../models/user");
const Driver = require("../models/driver");
const GeoJSON = require("mongoose-geojson-schema");

//const objectID = mongoose.Schema.Types.ObjectId;

//const user_id = User.ObjectId;
//const driver_id = Driver.ObjectId;
const ObjectId = mongoose.Schema.Types.ObjectId;

const bid_Schema = mongoose.Schema({
  user_id: ObjectId,
  placed_time: { type: Date, require: true, default: Date.now },
  bid_value: { type: Number, require: true },
  description: { type: String, require: true },
  photo: [URL],
  due_time: { type: Date },
  vehicle_type: { type: String },
  start_location: {
    type: mongoose.Schema.Types.Point,
    coordinates: [{ lon: { type: Number } }, { lon: { type: Number } }] //syntax ?
  },
  destination_location: {
    type: mongoose.Schema.Types.Point,
    coordinates: [{ lon: { type: Number } }, { lon: { type: Number } }] //syntax ?
  },

  bids: [{ driver: ObjectId, placed_value: Number, placed_time: Date }],

  driver: ObjectId //accepted driver
});

const Bid = (module.exports = mongoose.model("Bid", bid_Schema));
