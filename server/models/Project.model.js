// models/User.model.js

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const projectSchema = new Schema({
  projectNumber: Number,
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
});

module.exports = model("Project", projectSchema);
