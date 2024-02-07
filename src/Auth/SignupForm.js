import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../Alert";

//Signup form - displays form and handles signup form submission

function SignupForm({ signup }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
    });
    const [formErrors, setFormErrors] = useState([]);

    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await signup(formData);
        if (result.success) {
            navigate("/companies"); // Use navigate to redirect
        } else {
            setFormErrors(result.errors);
        }
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value }));
    }

    return (
        <div>
            <h2>Sign Up</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username</label>
                        <input
                            name="username"
                            className="form-control"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>First name</label>
                        <input
                            name="firstName"
                            className="form-control"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Last name</label>
                        <input
                            name="lastName"
                            className="form-control"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    {formErrors.length > 0 && <Alert type="danger" messages={formErrors} />}
                    <button type="submit" > Submit </button>


                </form>
            </div>
        </div>
    )


}

export default SignupForm