import React, {useContext} from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../Auth/UserContext";

// Define a ProtectedRoute component
function ProtectedRoute() {
  // Use the useContext hook to access the current user from UserContext
  const { currentUser } = useContext(UserContext);

  console.debug("ProtectedRoute", "currentUser=", currentUser);

  // Check if there is no current user (i.e., if the user is not logged in)
  if (!currentUser) {
    // If not logged in, redirect to the login page
    // The 'replace' prop makes sure the current page is replaced in the history stack
    return <Navigate to="/login" replace />;
  }
  // If a user is logged in render the child components
  return <Outlet />;
}

export default ProtectedRoute;
