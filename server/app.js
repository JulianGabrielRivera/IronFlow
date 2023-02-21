var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var projectsRouter = require("./routes/projects");
var labsRouter = require("./routes/labs");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    credentials: true,
    // origin: process.env.ORIGIN,
    origin: "*",
    // origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/projects", projectsRouter);
app.use("/labs", labsRouter);

mongoose
  .connect(process.env.MONGODB_URI)
  .then((x) => {
    console.log(`Connected to Mongo database: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.log(`An error occurred while connecting to the Database: ${err}`);
  });

module.exports = app;
