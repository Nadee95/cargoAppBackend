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
      lat: req.body.user_location.lat, lon: req.body.user_location.lon, address: req.body.user_location.address
    },
    destination: {
      lat: req.body.destination.lat, lon: req.body.destination.lon, address: req.body.destination.address
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
      res.send(requests);
    }
  });
});

//get requests of a perticular user added
router.get("/getRequest/:userId", (req, res, next) => {
  Request.find({ user_id: req.params.userId }, '-__v -destination -user_location', (error, requests) => {
    if (error) {
      return next(error);
    } else {
      res.send(requests);
    }
  });
});

// update req with driver_id(accept request)
router.put("/updateRequest/:reqId", (req, res, next) => {
  Request.findOneAndUpdate(req.params.reqId, { driver_id: req.body.driver_id }, (error, requests) => {
    if (error) {
      return next(error);
    } else {
      res.send(requests);
    }
  });
});


// delete a request
router.delete("/deleteRequest/:reqId", (req, res, next) => {
  Request.findByIdAndRemove(req.params.reqId, (error, requests) => {
    if (error) {
      return next(error);
    } else {
      res.send(requests);
    }
  });
});

module.exports = router;
