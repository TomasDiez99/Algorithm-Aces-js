import React, { useState } from "react";
import "../../styles/global.css";
import "../../styles/login.css";

function Login() {
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
                <h2>Log In</h2>
                <label>
                    Email:
                    <input type="email" value={email} onChange={handleEmailChange} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </label>
                <p className="register-link">
                    Don't have an account? <a href="/register">Sign up here</a>.
                </p>
                <button type="submit" className="login-submit-button" >Sing in</button>
            </form>
        </div>
    );
}

export default Login;
