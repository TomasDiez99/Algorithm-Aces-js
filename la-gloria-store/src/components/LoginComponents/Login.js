import React, {useEffect, useState} from "react";
import "../../styles/global.css";
import "../../styles/login.css";
import {useAuth} from "../../hooks/useAuth";

function Login() {
    const {loginAuth, errorMessage,setErrorMessage} = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
        await loginAuth(email, password);
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <p className={errorMessage ? "errmsg" : "offscreen"} aria-live="assertive">
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
                <button type="submit" className="login-submit-button">Sing in</button>
            </form>
        </div>
    );
}

export default Login;
