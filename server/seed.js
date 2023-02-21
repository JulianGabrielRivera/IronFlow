const Project = require("../server/models/Project.model");
const Lab = require("../server/models/Lab.model");

const projectData = require("./project-data.json");
// const weekData = require("./week-data.json");

require("dotenv").config();

const mongoose = require("mongoose");

const dataLoop = async () => {
  try {
    for (let i = 0; i < projectData.projectNumber.length; i++) {
      await Project.create({
        projectNumber: projectData.projectNumber[i].id,
      });
    }
    for (let i = 0; i < projectData.weekNumbers.length; i++) {
      await Lab.create({
        week: projectData.weekNumbers[i].weekNumber,
        dayOne: projectData.weekNumbers[i].day,
        dayTwo: projectData.weekNumbers[i].day2,
        dayThree: projectData.weekNumbers[i].day3,
        dayFour: projectData.weekNumbers[i].day4,
        dayFive: projectData.weekNumbers[i].day5,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
console.log(process.env);
mongoose
  .connect(process.env.MONGODB_URI)
  .then((x) => {
    return dataLoop();
    //  console.log(
    //   `Connected to Mongo database: "${x.connections[0].name}"`
    // );
  })
  .then(() => {
    return mongoose.connection.close();
  })

  .catch((err) => {
    console.log(`An error occurred while connecting to the Database: ${err}`);
  });
