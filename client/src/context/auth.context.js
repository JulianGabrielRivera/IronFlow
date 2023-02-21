import React, { useState, useEffect } from "react";

import axios from "axios";

// creating a context
const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState("false");
  const [isLoading, setIsLoading] = useState("true");
  const [user, setUser] = useState(null);

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };
  const storedToken = localStorage.getItem("authToken");

  const authenticateUser = () => {
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem("authToken");
    // If the token exists in the localStorage
    storeToken(storedToken);
    if (storedToken) {
      // We must send the JWT token in the request's "Authorization" Headers
      axios
        .get(`${process.env.REACT_APP_API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          // If the server verifies that JWT token is valid
          const user = response.data;
          console.log(user.name);
          // Update state variables
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(user);
          // setTotalLiked(response.data.places.length);
        })
        .catch((error) => {
          // If the server sends an error response (invalid token)
          // Update state variables
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
        });
    } else {
      // If the token is not available (or is removed)
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };

  const removeToken = () => {
    // localstorage an object with these properties and we can access them
    localStorage.removeItem("authToken");
  };
  const logOutUser = () => {
    removeToken();
    authenticateUser();
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
        storedToken,

        setUser,
      }}
    >
      {/*  we need this so when we wrap our provider around app, every children of app the provider becomes able to use */}
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
