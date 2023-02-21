var express = require("express");
var router = express.Router();
const Question = require("../models/Question.model");
const Lab = require("../models/Lab.model");
const mongoose = require("mongoose");

router.get("/", async (req, res, next) => {
  try {
    const allLabs = await Lab.find();

    res.json({ allLabs });
  } catch (err) {
    console.log(err);
  }
});

router.get("/:weekId/:dayQuestions", async (req, res, next) => {
  const { weekId, dayQuestions } = req.params;
  console.log(weekId, dayQuestions);
  Lab.findOne({ week: weekId })
    .populate(
      "dayOneQuestions dayTwoQuestions dayThreeQuestions dayFourQuestions dayFiveQuestions"
    )
    .then((labFound) => {
      res.json({ labFound });
    });
});

router.post("/:weekId/:dayQuestions", async (req, res, next) => {
  try {
    const { weekId, dayQuestions } = req.params;
    console.log(typeof weekId, typeof dayQuestions, "yooo");
    console.log(dayQuestions);
    const { title, question, askedBy } = req.body;
    const questionCreated = await Question.create({ title, question, askedBy });
    console.log(questionCreated);

    // const lab = await Lab.findOneAndUpdate(
    //   { week: weekId },
    //   { $push: { dayOneQuestions: questionCreated._id } },
    //   { new: true }
    // );
    if (dayQuestions === "dayOneQuestions") {
      const lab = await Lab.findOneAndUpdate(
        { week: weekId },
        { $push: { dayOneQuestions: questionCreated._id } },
        { new: true }
      );
      console.log(lab);
    }
    if (dayQuestions === "dayTwoQuestions") {
      const lab = await Lab.findOneAndUpdate(
        { week: weekId },
        { $push: { dayTwoQuestions: questionCreated._id } },
        { new: true }
      );
      console.log(lab);
    }
    if (dayQuestions === "dayThirdQuestions") {
      const lab = await Lab.findOneAndUpdate(
        { week: weekId },
        { $push: { dayThirdQuestions: questionCreated._id } },
        { new: true }
      );
      console.log(lab);
    }
    if (dayQuestions === "dayFourQuestions") {
      const lab = await Lab.findOneAndUpdate(
        { week: weekId },
        { $push: { dayFourQuestions: questionCreated._id } },
        { new: true }
      );
      console.log(lab);
    }
    if (dayQuestions === "dayFiveQuestions") {
      const lab = await Lab.findOneAndUpdate(
        { week: weekId },
        { $push: { dayFiveQuestions: questionCreated._id } },
        { new: true }
      );
      console.log(lab);
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/lab/day/create", async (req, res, next) => {
  try {
    const { week, day } = req.body;
    console.log(week);

    const createdWeek = await Lab.create({ week }).then((response) => {
      console.log(response);
    });
    res.json({ success: "week created" });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      res.json({ errorMessage: "week already exists" });
    } else if (err.code === 11000) {
      res.json({ errorMessage: "week already exists" });
    } else {
      next(err);
    }
  }
});

module.exports = router;
