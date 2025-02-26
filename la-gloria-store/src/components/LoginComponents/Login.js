import React, {useEffect, useState} from "react";
import "../../styles/global.css";
import "../../styles/login.css";
import {useAuth} from "../../hooks/useAuth";

function Login() {
    const {loginAuth, errorMessage, setErrorMessage} = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setErrorMessage("");
    }, [email, password]);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await loginAuth(email, password);
        setLoading(false);
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <p className={errorMessage ? "feedback-message" : "offscreen"} aria-live="assertive">
                    {errorMessage}
                </p>
                <h2>Log In</h2>
                <label>
                    Email:
                    <input type="email" value={email} onChange={handleEmailChange}/>
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={handlePasswordChange}/>
                </label>
                <p className="register-link">
                    Don't have an account? <a href="/register">Sign up here</a>.
                </p>
                <button
                    type="submit"
                    className="login-submit-button"
                    disabled={loading}>
                    {loading ? "Logging in..." : "Log In"}
                </button>
            </form>
        </div>
    );
}

export default Login;
