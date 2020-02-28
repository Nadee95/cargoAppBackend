const multer = require("multer");
const formData = require("express-form-data");
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const config = require("./config/database");

const users = require("./routes/users");
const vehicles = require("./routes/vehicle");
const transport_request = require("./routes/Transport_request");

const verify = require("./routes/verifyToken");

//connect to db
mongoose.connect(config.database, { useNewUrlParser: true, useFindAndModify: false });
mongoose.connection.on("connected", () => {
  console.log("Connected to database " + config.database);
});

mongoose.connection.on("error", err => {
  console.log("Database error " + err);
});

const app = express();

//port number
const PORT = process.env.PORT || 3000;
exports.PORT = PORT;

//image upload path
// const UPLOAD_PATH = "uploads";
// exports.UPLOAD_PATH = UPLOAD_PATH;

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, UPLOAD_PATH);
//   },
//   filename: function (req, file, cb) {
//     cb(null, req.body._id + "-" + Date.now());
//   }
// });

// let upload = multer({ storage: storage });
// exports.upload = upload;


//CORS Middleware
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//body parser Middleware
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));
//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());



require("./config/passport")(passport);

app.use("/users", users);
app.use("/vehicle", vehicles);
app.use("/transport_request", verify, transport_request);

app.get("/", (req, res) => {
  res.send("invalid End Point");
});

app.listen(PORT, () => {
  console.log("server started on port:" + PORT);
});
