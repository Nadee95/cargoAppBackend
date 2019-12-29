const Transport_request = require("../models/transport_request");
const express = require("express");
const router = express.Router();
const { cargoRequestValidation } = require("../validation");

const verify = require("./verifyToken");

router.post("/makeRequest", async (req, res, next) => {
  const { error } = cargoRequestValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
});

module.exports = router;
