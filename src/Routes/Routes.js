import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";

function Routes() {

    return (
        <div>
            <Routes>
                //route to the home page
                <Route path="/" element = {<Homepage />}  />

                //signup route, passing in the signup prop to the SignUpForm component
                <Route path="/signup" element = {<SignUpForm signup={signup} />} />

                //login route, passing in the login props to the LoginForm component
                <Route path="/login" element ={<LoginForm login={login} />} />

                //route to companies list 
                <Route path="/companies" element={<CompanyList />} />

                // route to jobs list
                <Route path="/jobs" element={<JobList />} />
                
                // route to companies details by handle
                <Route path="/companies/:handle" element={<CompanyDetail />} />

                //route to profile form
                <Route path="/profile" element={<ProfileForm />} />

                //routes to home if path does not match existing routes
                <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
        </div>
    );
}

export default Routes;