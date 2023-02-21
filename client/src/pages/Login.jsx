import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password };
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        // navigate("/");
        console.log(response);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="loginContainer">
      <div className="loginContainerInfo">
        <h1>Log In</h1>

        <form onSubmit={handleLoginSubmit}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />

          <button type="submit">Login</button>
          <div id="signInDiv" style={{ zIndex: "1" }}></div>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <Link to={"/signup"}>Sign Up</Link>
      </div>
    </div>
  );
};

export default LoginPage;
