const mailTimer = require("./utils/timer");

// init project
const express = require("express");
const morgan = require("morgan");
const app = express();
const bodyParser = require("body-parser");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// app.use(morgan());

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// Set Template Engine
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

// Set the Routes folder
const mainRoute = require("./routes/index");
app.use("/", mainRoute);

module.exports = app;
