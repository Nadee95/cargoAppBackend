const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const config = require("./config/database");

const users = require("./routes/users");
const vehicles = require("./routes/vehicle");

//connect to db
mongoose.connect(config.database);
mongoose.connection.on("connected", () => {
  console.log("Connected to database " + config.database);
});

mongoose.connection.on("error", err => {
  console.log("Database error " + err);
});

const app = express();

//port number
const port = process.env.PORT || 3000;

//CORS Middleware
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//body parser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

app.use("/users", users);
app.use("/vehicle", vehicles);

app.get("/", (req, res) => {
  res.send("invalid End Point");
});

app.listen(port, () => {
  console.log("server started on port:" + port);
});
