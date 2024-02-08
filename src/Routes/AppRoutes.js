import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import Homepage from "../HomePage"
import CompanyList from "../Companies/CompanyList"
import JobList from "../Jobs/JobList";
import CompanyDetail from "../Companies/CompanyDetail";
import LoginForm from "../Auth/LoginForm";
import SignupForm from "../Auth/SignupForm";
import ProfileForm from "../ProfileForm"
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes(login, signup) {
    console.debug(
        "Routes",
        `login=${typeof login}`,
        `register=${typeof register}`,
    );

    return (
        <div className="pt-5">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginForm login={login} />} />
        <Route path="/signup" element={<SignupForm signup={signup} />} />

        {/* Use ProtectedRoute for routes that require authentication */}
        <Route element={<ProtectedRoute />}>
          <Route path="/companies" element={<CompanyList />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/companies/:handle" element={<CompanyDetail />} />
          <Route path="/profile" element={<ProfileForm />} />
        </Route>

        {/* Redirect any unknown paths to the homepage */}
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </div>
    );
}

export default AppRoutes;