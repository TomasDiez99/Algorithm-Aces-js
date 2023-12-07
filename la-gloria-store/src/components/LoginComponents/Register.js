import React, { useState } from "react";
import "../../styles/global.css";
import "../../styles/login.css";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes realizar acciones adicionales, como enviar la información a un servidor
        console.log("Email:", email);
        console.log("Password:", password);
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Register</h2>
                <label>
                    Email:
                    <input type="email" value={email} onChange={handleEmailChange} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </label>
                <button type="submit" className="login-submit-button" >Sing up</button>
            </form>
        </div>
    );
}

export default Register;
