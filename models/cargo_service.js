const mongoose = require("mongoose");
const config = require("../config/database");
const User = require("../models/user");
const Driver = require("../models/driver");
const Vehicle = require("../models/vehicle");

const user_id = User.ObjectId;
const driver_id = Driver.ObjectId;
const vehicle_id = Vehicle.ObjectId;

const cargo_serviceSchema = mongoose.Schema({
  service_name: {
    type: String,
    required: true,
    unique: true
  },
  email: { type: String, required: true }, //another user type therefore can replace user2 id
  phone_no: [{ type: Number, required: true }],
  created_date: { type: Date }, // set to auto
  employees: [Driver.ObjectId],
  vehicles: [vehicle_id.ObjectId]
  //photo or logo if needed
});

const Cargo_service = (module.exports = mongoose.model(
  "Cargo_service",
  cargo_serviceSchema
));
