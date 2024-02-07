import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../Alert";

function LoginForm({ login }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [formErrors, setFormErrors] = useState([])

    //handles form submission
    //if login is successful it navigates user to the /companies route
    async function handleSubmit(e) {
        e.preventDefault();
        let result = await login(formData);
        if (result.sucess) {
            navigate("/companies")
        }
        else {
            setFormErrors(result.errors)
        }
    }

    //handles updating the formData
    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(log => ({ ...log, [name]: value }));
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        name="username"
                        className="form-control"
                        value={formData.username}
                        onChange={handleChange}
                        autoComplete="username"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="current-password"
                        required
                    />
                </div>

                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null}

                <button type="submit">Submit</button>
            </form>
        </div>

    )

}

export default LoginForm