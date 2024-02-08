import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./Routes/Navigation";
import AppRoutes from "./Routes/AppRoutes";
import useLocalStorage from "./hooks/useLocalStorage";
import LoadingSpinner from "./LoadingSpinner";
import JoblyApi from "./api/api";
import UserContext from "./Auth/UserContext";
import jwt from "jsonwebtoken";

//key for storing the auth token in local storage
export const TOKEN_STORAGE_ID = "jobly-token";

function App() {
  
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  // Effect hook to load user info on initial startup or when the token changes
  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          // Decode the token to get the username, set the token for API calls, and fetch user data
          let { username } = jwt.decode(token);
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          setApplicationIds(new Set(currentUser.applications));
        } catch (err) {
          // Handle errors (e.g., token invalidation) by resetting user state
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      //Indicate that user info has been loaded
      setInfoLoaded(true);
    }

    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  // Function to handle user logout
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }
     
  async function signup(signupData) {
    try {
      let token = await JoblyApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      // Return error details if signup fails
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  // Function to handle user login
  async function login(loginData) {
    try {
      let token = await JoblyApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  // Helper function to check if the user has applied to a job
  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }

   // Function to handle job application
  function applyToJob(id) {
    if (hasAppliedToJob(id)) return;
    JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }
  // Show a loading spinner while user info is being loaded
  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob }}>
        <div className="App">
          <Navigation logout={logout} />
          <AppRoutes login={login} signup={signup} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;


