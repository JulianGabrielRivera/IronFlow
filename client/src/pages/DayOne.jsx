import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const DayOne = () => {
  const { weekId, dayQuestions } = useParams();
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [askedBy, setAskedBy] = useState("");
  const [questionsArray, setQuestionsArray] = useState([]);

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  const questionHandler = (e) => {
    setQuestion(e.target.value);
  };
  const askedByHandler = (e) => {
    setAskedBy(e.target.value);
  };
  console.log(weekId, dayQuestions);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/labs/${weekId}/${dayQuestions}`)
      .then((response) => {
        if (dayQuestions === "dayOneQuestions") {
          setQuestionsArray(response.data.labFound.dayOneQuestions);
        }
        if (dayQuestions === "dayTwoQuestions") {
          setQuestionsArray(response.data.labFound.dayTwoQuestions);
        }
        if (dayQuestions === "dayThreeQuestions") {
          setQuestionsArray(response.data.labFound.dayThreeQuestions);
        }
        if (dayQuestions === "dayFourQuestions") {
          setQuestionsArray(response.data.labFound.dayFourQuestions);
        }
        if (dayQuestions === "dayFiveQuestions") {
          setQuestionsArray(response.data.labFound.dayFiveQuestions);
        }

        console.log(response);
      });
  }, []);
  const onSubmit = (e) => {
    const reqBody = {
      title,
      question,
      askedBy,
    };
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/labs/${weekId}/${dayQuestions}`,
        reqBody
      )
      .then((response) => {
        console.log(response);
      });
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="">Title:</label>
        <input type="text" name="title" onChange={titleHandler} />
        <label htmlFor="">Question:</label>
        <input type="text" name="question" onChange={questionHandler} />
        <label htmlFor="">Your Name:</label>
        <input type="text" name="askedBy" onChange={askedByHandler} />
        <button type="submit" onSubmit={onSubmit}>
          Ask
        </button>
      </form>
      {questionsArray.map((question) => {
        return <>{question.question}</>;
      })}
    </>
  );
};

export default DayOne;
