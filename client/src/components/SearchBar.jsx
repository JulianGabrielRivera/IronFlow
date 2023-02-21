import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const SearchBar = ({
  projectNumber,
  search,
  questionsArray,
  setQuestionsArray,
  filteredQuestionsArray,
  setFilteredQuestionsArray,
  setSearch,
}) => {
  //   const { projectNumber } = useParams();
  //   const [search, setSearch] = useState("");

  //   const [questionsArray, setQuestionsArray] = useState([]);
  //   const [filteredQuestionsArray, setFilteredQuestionsArray] = useState([]);
  const searchHandler = (e) => {
    setSearch(e.target.value);
  };
  const searchSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/projects/search/${projectNumber}`,
        {
          search,
          projectNumber,
        }
      )
      .then((response) => {
        const projectQuestionsArr = [];
        console.log(response);
        if (projectNumber === "1") {
          response.data.project1Questions[0].questions.forEach((question) => {
            if (question.question.includes(search)) {
              projectQuestionsArr.push(question);
            }
          });
          console.log(projectQuestionsArr);
          setFilteredQuestionsArray(projectQuestionsArr);
          //   setQuestionsArray([]);
          setQuestionsArray([]);

          console.log(filteredQuestionsArray);
        }
        if (projectNumber === "2") {
          response.data.project2Questions[0].questions.forEach((question) => {
            if (question.question.includes(search)) {
              projectQuestionsArr.push(question);
            }
          });
          console.log(projectQuestionsArr);
          setFilteredQuestionsArray(projectQuestionsArr);
          setQuestionsArray([]);
          console.log(filteredQuestionsArray);
        } else if (projectNumber === "3") {
          response.data.project3Questions[0].questions.forEach((question) => {
            if (question.question.includes(search)) {
              projectQuestionsArr.push(question);
            }
          });
          console.log(projectQuestionsArr);
          setFilteredQuestionsArray(projectQuestionsArr);
          setQuestionsArray([]);
          console.log(filteredQuestionsArray);
        }
      });
  };
  return (
    <>
      <form onSubmit={searchSubmit}>
        <input
          type="text"
          placeholder="search"
          name="search"
          onChange={searchHandler}
        />
        <button type="submit" onSubmit={searchSubmit}>
          Search
        </button>
      </form>
    </>
  );
};

export default SearchBar;
