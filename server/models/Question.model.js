// models/User.model.js

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const questionSchema = new Schema({
  owner: String,
  title: String,
  question: String,
  answer: String,
  answeredBy: String,
  askedBy: String,
});

module.exports = model("Question", questionSchema);
