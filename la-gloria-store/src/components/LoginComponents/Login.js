import React, { useState } from "react";
import "../../styles/global.css";
import "../../styles/login.css";
import {useAuth} from "../../hooks/useAuth";

function Login() {
    const { loginAuth } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await loginAuth(email, password);
        } catch (error) {
            console.error("Error during login:", error);
        }
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
