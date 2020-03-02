const mongoose = require("mongoose");
const config = require("../config/database");
const GeoJSON = require("mongoose-geojson-schema");
const Cargo_service = require("../models/cargo_service");

const ObjectId = mongoose.Schema.Types.ObjectId;

const vehicleSchema = mongoose.Schema({
  vehicle_no: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  driver_id: ObjectId,
  type: {
    type: String,
    required: true
  },
  photo: String,
  max_volume: { type: Number, required: true },
  max_weight: { type: Number, required: true },
  cargo_service: ObjectId,
  location: {
    lat: { type: Number }, lon: { type: Number }
  }
});
//cargo service ?

const Vehicle = (module.exports = mongoose.model("Vehicle", vehicleSchema));

/////db functions/////

module.exports.getVehicleById = function (id, callback) {
  Vehicle.findById(id, callback);
};

module.exports.getVehicleByVehicleNo = function (vehicle_no, callback) {
  const query = { vehicle_no: vehicle_no };
  User.findOne(query, callback);
};

module.exports.addVehicle = function (newVehicle, callback) {

  Vehicle.save(callback);
};
