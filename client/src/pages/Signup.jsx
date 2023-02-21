import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // instantiate so we could use it
  const navigate = useNavigate();

  // lets set our handle that will have our value stored in it

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password, name };

    axios
      .post(`${process.env.REACT_APP_API_URL}/users/signup`, requestBody)
      .then((response) => {
        console.log(response);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
    setEmail("");
    setPassword("");
    setName("");
  };

  return (
    <div className="signUpContainer">
      <div className="signUpContainerInfo">
        <h1>Sign Up!</h1>

        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={handleEmail}
            />
            <label htmlFor="">Password</label>{" "}
            <input
              type="password"
              placeholder="Password"
              onChange={handlePassword}
            />
            <label htmlFor="">Name</label>{" "}
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={handleName}
            />
            <Link>Forgot password?</Link>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <Link to={"/login"}>Login</Link>
      </div>
    </div>
  );
};

export default SignupPage;
