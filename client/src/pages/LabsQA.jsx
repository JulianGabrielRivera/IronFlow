import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Labs = () => {
  const [labs, setAllLabs] = useState([]);
  const { weekId } = useParams();
  console.log(weekId);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/labs`)
      .then((response) => {
        // const { weekId, dayId } = useParams();
        // storeToken(response.data.authToken);
        // authenticateUser();
        // navigate("/");
        console.log(response.data.allLabs);
        setAllLabs(response.data.allLabs);
      })
      .catch((error) => {
        // const errorDescription = error.response.data.message;
        // setErrorMessage(errorDescription);
      });
  }, []);

  return (
    <div>
      {labs.map((lab) => {
        return (
          <>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h1>Week: {lab.week}</h1>
              <Link to={`/${lab.week}/dayOneQuestions`}>Day 1{lab.dayOne}</Link>
              <Link to={`/${lab.week}/dayTwoQuestions`}>Day 2{lab.dayTwo}</Link>
              <Link to={`/${lab.week}/dayThreeQuestions`}>
                Day 3{lab.dayThree}
              </Link>
              <Link to={`/${lab.week}/dayFourQuestions`}>
                Day 4{lab.dayFour}
              </Link>
              <Link to={`/${lab.week}/dayFiveQuestions`}>
                Day 5{lab.dayFive}
              </Link>
            </div>
          </>
        );
      })}
    </div>
  );
};
export default Labs;
