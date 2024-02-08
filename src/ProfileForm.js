import React, { useState, useContext } from "react";
import UserContext from "./Auth/UserContext";
import JoblyApi from "./api/api";
import Alert from "./Alert";

/** Handles Profile update page  */
function ProfileForm() {
    // Accessing the current user's data and a function to update it from UserContext
    const { currentUser, setCurrentUser } = useContext(UserContext)
    // Setting up local state for the form data, initialized with the current user's info
    const [formData, setFormData] = useState({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        username: currentUser.username,
        password: "",
    });
    const [formErrors, setFormErrors] = useState([]);
    //state used to track if profile changes were saved successfully
    const [saveConfirmed, setSaveConfirmed] = useState(false)

    async function handleSubmit(evt) {
        evt.preventDefault();

        // Extracting the updated profile data from formData
        let profileData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
        };

        let username = formData.username;
        let updatedUser;

        try {
            // Attempt to save the updated profile data through the API
            updatedUser = await JoblyApi.saveProfile(username, profileData);

        } catch (errors) {
            // If an error occurs, set the errors in formErrors state and exit the function
            debugger;
            setFormErrors(errors);
            return;
        }
        // Clear the password field, reset any errors, confirm the save, and update the current user info
        setFormData(f => ({ ...f, password: "" }));
        setFormErrors([]);
        setSaveConfirmed(true);

        // Updating the current user info in the UserContext
        setCurrentUser(updatedUser);
    }


    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(f => ({
            ...f,
            [name]: value,
        }));
        setFormErrors([]);
    }

    return (
        <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
            <h3>Profile</h3>
            <div className="card">
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label>Username</label>
                            <p className="form-control-plaintext">{formData.username}</p>
                        </div>
                        <div className="form-group">
                            <label>First Name</label>
                            <input
                                name="firstName"
                                className="form-control"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                name="lastName"
                                className="form-control"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirm password to make changes:</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        {/* Conditionally rendering alerts for errors or success messages */}
                        {formErrors.length
                            ? <Alert type="danger" messages={formErrors} />
                            : null}

                        {saveConfirmed
                            ?
                            <Alert type="success" messages={["Updated successfully."]} />
                            : null}

                        <button
                            className="btn btn-primary btn-block mt-4"
                            onClick={handleSubmit}
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default ProfileForm