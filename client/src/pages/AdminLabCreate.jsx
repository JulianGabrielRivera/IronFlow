import axios from "axios";
import { useState, useEffect } from "react";

const AdminLabCreate = () => {
  const [week, setWeek] = useState(0);
  const [day, setDay] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const weekHandler = (e) => {
    setWeek(e.target.value);
  };
  const dayHandler = (e) => {
    setDay(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      week,
      day,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}/labs/lab/day/create`, requestBody)
      .then((response) => {
        // storeToken(response.data.authToken);
        // authenticateUser();
        // navigate("/");
        setSuccessMessage(response.data.success);
        setErrorMessage(response.data.errorMessage);
        console.log(response.data);
      })
      .catch((error) => {
        // const errorDescription = error.response.data.message;
        // setErrorMessage(errorDescription);
      });
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="">Week:</label>
        <input type="text" name="week" onChange={weekHandler} />
        <button type="submit" onSubmit={onSubmit}>
          Create Week
        </button>
      </form>
      {errorMessage ? <p>{errorMessage}</p> : <p>{successMessage}</p>}
    </>
  );
};
export default AdminLabCreate;
