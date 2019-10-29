const mongoose = require("mongoose");
const config = require("../config/database");

const Cargo_service = require("../models/cargo_service");

const cargo_service_id = Cargo_service.ObjectId;

const vehicleSchema = mongoose.Schema({
  vehicle_no: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  type: {
    type: String,
    required: true
  },
  photo: URL,
  max_volume: { type: Float, required: true },
  max_weight: { type: Float, required: true },
  cargo_service: cargo_service_id,
  location: {
    type: "Point",
    coordinates: [{ lon: { type: float } }, { lon: { type: float } }] //syntax ?
  }
});
//cargo service ?

const Vehicle = (module.exports = mongoose.model("Vehicle", vehicleSchema));

/////db functions/////

module.exports.getVehicleById = function(id, callback) {
  Vehicle.findById(id, callback);
};

module.exports.getVehicleByVehicleNo = function(vehicle_no, callback) {
  const query = { vehicle_no: vehicle_no };
  User.findOne(query, callback);
};

module.exports.addVehicle = function(newVehicle, callback) {
  if (err) throw err;
  newVehicle.save(callback);
};
