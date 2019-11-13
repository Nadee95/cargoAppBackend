const express = require("express");
const router = express.Router();

router.post("/", (req, res, next) => {
  console.log("/vehicles");
});

module.exports = router;
