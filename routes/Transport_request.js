const Transport_request = require("../models/transport_request");
const express = require("express");
const router = express.Router();
const { cargoRequestValidation } = require("../validation");
const Request = require("../models/transport_request");
const mongoose = require("mongoose");


router.post("/makeRequest", async (req, res, next) => {

  const { error } = cargoRequestValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let newRequest = new Request({
    user_id: req.body.user_id,
    cargo_type: req.body.cargo_type,
    volume: req.body.volume,
    weight: req.body.weight,
    on_time: Date.now(),
    due_time: req.body.due_time,
    user_location: {
      coordinates: [{ lat: req.body.user_location.lat }, { lon: req.body.user_location.lon }]
    },
    destination: {
      coordinates: [{ lat: req.body.destination.lat }, { lon: req.body.destination.lon }]
    }
  });
  newRequest.save((err) => {
    if (err) {
      res.json({
        success: false,
        msg: "Fail to Add Request."
      });
      console.log(err);
    }
  }, (data) => {
    console.log(data);
    res.send({ success: true, msg: "Request Added Successfully.", data });

  });

});

router.get("/allRequests", (req, res, next) => {
  Request.find({}, '-__v', (error, requests) => {
    if (error) {
      return next(error);
    } else {
      res.json(requests).send();
    }
  });
});

module.exports = router;
