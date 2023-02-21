import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SearchBar from "../components/SearchBar";

const ProjectThreeQA = () => {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [askedBy, setAskedBy] = useState("");
  const [search, setSearch] = useState("");
  const [questionsArray, setQuestionsArray] = useState([]);
  const [filteredQuestionsArray, setFilteredQuestionsArray] = useState([]);
  const { projectNumber } = useParams();

  const [id, setId] = useState(3);

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  const questionHandler = (e) => {
    setQuestion(e.target.value);
  };
  const askedByHandler = (e) => {
    setAskedBy(e.target.value);
  };
  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      title,
      question,
      askedBy,
      id,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/projects/question/create`,
        requestBody
      )
      .then((response) => {
        // storeToken(response.data.authToken);
        // authenticateUser();
        // navigate("/");
        setQuestionsArray([...questionsArray, response.data.questionCreated]);
        console.log(response.data);
      })
      .catch((error) => {
        // const errorDescription = error.response.data.message;
        // setErrorMessage(errorDescription);
      });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/projects/projectThreeQA`)
      .then((response) => {
        // storeToken(response.data.authToken);
        // authenticateUser();
        // navigate("/");
        console.log(response.data.allProjectQuestions[0].questions);
        setQuestionsArray(response.data.allProjectQuestions[0].questions);
      })
      .catch((error) => {
        // const errorDescription = error.response.data.message;
        // setErrorMessage(errorDescription);
      });
  }, []);
  return (
    <>
      <div className="QA">
        <div className="searchHere">
          <SearchBar
            filteredQuestionsArray={filteredQuestionsArray}
            setFilteredQuestionsArray={setFilteredQuestionsArray}
            search={search}
            projectNumber={projectNumber}
            setQuestionsArray={setQuestionsArray}
            setSearch={setSearch}
          />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              axios
                .get(`${process.env.REACT_APP_API_URL}/projects/projectThreeQA`)
                .then((response) => {
                  // storeToken(response.data.authToken);
                  // authenticateUser();
                  // navigate("/");
                  console.log(response.data.allProjectQuestions[0].questions);
                  setQuestionsArray(
                    response.data.allProjectQuestions[0].questions
                  );
                  setFilteredQuestionsArray([]);
                })
                .catch((error) => {
                  console.log(error);
                  // const errorDescription = error.response.data.message;
                  // setErrorMessage(errorDescription);
                });
            }}
          >
            <button type="submit">Search All</button>
          </form>
          <h1>Project 3 QA</h1>
        </div>
        <h2>Ask a question</h2>
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
          return (
            <div className="eachQuestion">
              <p>{question.title}</p>
              <p>{question.question}</p>
              <p>{question.askedBy}</p>
            </div>
          );
        })}
        {filteredQuestionsArray
          ? filteredQuestionsArray.map((filteredQuestion) => {
              return (
                <div className="eachQuestion">
                  <h2>{filteredQuestion.title}</h2>
                  <p>{filteredQuestion.question}</p>
                  <p>{filteredQuestion.askedBy}</p>
                </div>
              );
            })
          : questionsArray.map((question) => {
              return (
                <div className="eachQuestion">
                  <h2>{question.title}</h2>
                  <p>{question.question}</p>
                  <p>{question.askedBy}</p>
                </div>
              );
            })}
      </div>
    </>
  );
};

export default ProjectThreeQA;
