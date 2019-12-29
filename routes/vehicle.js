const express = require("express");
const router = express.Router();
const verify = require("./verifyToken");

router.post("/", verify, (req, res, next) => {
  console.log("/vehicles");
  res.send(req.user._id);
});

module.exports = router;
