const mongoose = require("mongoose");

const User = require("../models/user");
const Driver = require("../models/driver");
const GeoJSON = require("mongoose-geojson-schema");
//const user_id = User.ObjectId;
//const driver_id = Driver.ObjectId;
const ObjectId = mongoose.Schema.Types.ObjectId;

const transport_requestSchema = mongoose.Schema({
  user_id: ObjectId,
  cargo_type: { type: String, require: true },
  volume: { type: String, require: true },
  on_time: { type: Date, require: true, default: Date.now },
  due_time: { type: Date, require: true },
  user_location: {
    type: mongoose.Schema.Types.Point,
    coordinates: [{ lon: { type: Number } }, { lon: { type: Number } }] //syntax ?
  },
  destination: {
    type: mongoose.Schema.Types.Point,
    coordinates: [{ lon: { type: Number } }, { lon: { type: Number } }] //syntax ?
  },
  driver_id: ObjectId
});

const Transport_request = (module.exports = mongoose.model(
  "Transport_request",
  transport_requestSchema
));

module.exports.getTransportRequestById = function(id, callback) {
  User.findById(id, callback);
};
