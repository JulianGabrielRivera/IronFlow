// models/User.model.js

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const labSchema = new Schema({
  week: { type: Number, unique: true },

  // id: { type: Number, default: 1 },
  dayOneQuestions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  dayTwoQuestions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  dayThreeQuestions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  dayFourQuestions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  dayFiveQuestions: [{ type: Schema.Types.ObjectId, ref: "Question" }],

  // },
  // dayTwo: {
  //   id: { type: Number, default: 2 },
  //   dayOneQuestions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  // },
  // dayThree: {
  //   id: { type: Number, default: 3 },
  //   dayOneQuestions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  // },
  // dayFour: {
  //   id: { type: Number, default: 4 },
  //   dayOneQuestions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  // },
  // dayFive: {
  //   id: { type: Number, default: 5 },
  //   dayOneQuestions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  // },
  // dayTwo: String,
  // dayThree: String,
  // dayFour: String,

  // dayFive: String,

  // dayTwoQuestions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  // dayThreeQuestions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  // dayFourQuestions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  // dayFiveQuestions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
});

module.exports = model("Lab", labSchema);
