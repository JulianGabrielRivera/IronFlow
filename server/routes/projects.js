var express = require("express");
var router = express.Router();
const Question = require("../models/Question.model");
const Project = require("../models/Project.model");
const Lab = require("../models/Lab.model");

/* GET home page. */

router.post("/question/create", async (req, res, next) => {
  try {
    const { owner, question, answer, answeredBy, askedBy, title, id } =
      req.body;
    console.log(req.body);
    const questionCreated = await Question.create({
      owner,
      title,
      question,
      answer,
      answeredBy,
      askedBy,
    });
    const pushToProject = await Project.findOneAndUpdate(
      { projectNumber: id },
      { $push: { questions: questionCreated._id } },
      { new: true }
    );
    res.json({ questionCreated });
  } catch (err) {
    console.log(err);
  }
});

router.get("/projectOneQA", async (req, res, next) => {
  try {
    const allProjectQuestions = await Project.find({
      projectNumber: 1,
    }).populate("questions");
    console.log(allProjectQuestions);
    res.json({ allProjectQuestions });
  } catch (err) {
    console.log(err);
  }
});

router.get("/projectTwoQA", async (req, res, next) => {
  try {
    const allProjectQuestions = await Project.find({
      projectNumber: 2,
    }).populate("questions");
    console.log(allProjectQuestions);
    res.json({ allProjectQuestions });
  } catch (err) {
    console.log(err);
  }
});
router.get("/projectThreeQA", async (req, res, next) => {
  try {
    const allProjectQuestions = await Project.find({
      projectNumber: 3,
    }).populate("questions");
    console.log(allProjectQuestions);
    res.json({ allProjectQuestions });
  } catch (err) {
    console.log(err);
  }
});
router.post("/search/:projectNumber", async (req, res, next) => {
  const { search } = req.body;
  console.log(search);
  const { projectNumber } = req.params;
  console.log(typeof projectNumber);
  try {
    if (+projectNumber === 1) {
      const project1Questions = await Project.find({
        projectNumber: projectNumber,
      }).populate("questions");
      res.json({ project1Questions });
    } else if (+projectNumber === 2) {
      const project2Questions = await Project.find({
        projectNumber: projectNumber,
      }).populate("questions");
      res.json({ project2Questions });
    } else if (+projectNumber === 3) {
      const project3Questions = await Project.find({
        projectNumber: projectNumber,
      }).populate("questions");
      res.json({ project3Questions });
    }
    // console.log(questionArray);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
// project2Questions.forEach((question) => {
//     console.log(question);
//     if (question.question.includes(search)) {
//       questionArray.push(question);
//     }
//   });
