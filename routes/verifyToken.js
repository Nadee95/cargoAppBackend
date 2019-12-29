const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const token = req.header("auth_token");
  if (!token) return res.status(401).send("Access Denied.");

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;
    console.log("checked");
    console.log("user :", req.body.user);
    next();
  } catch (err) {
    res.status(401).send("Invalid token.");
  }
};
