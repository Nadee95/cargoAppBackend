const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../config/database");

const serviceSchema = mongoose.Schema({
  id: String,
  name: String,
  image: URL
});

const Service = (module.exports = mongoose.model("Service", serviceSchema));
