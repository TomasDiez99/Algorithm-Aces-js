import React, {useEffect, useState} from "react";
import "../../styles/global.css";
import "../../styles/login.css";
import {useNavigate} from "react-router-dom";

const EMAIL_REGEX = /.+@.+\.[A-Za-z]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PASSWORD_ERROR_MESSAGE =
    "Password must have at least 8 characters long, 1 lowercase, 1 uppercase, 1 number, and 1 special character";
const EMAIL_ERROR_MESSAGE = "Invalid email address. Please enter a valid email.";
const SUCCESS_MESSAGE = "Registration successful! You can now log in with your new credentials.";


function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setErrorMessage("");
        setShowMessage(false);
    }, [email, password]);

    useEffect(() => {
        setSuccessMessage("");
    }, [email, password]);

    const handleErrorMessage = (message) => {
        setErrorMessage(message);
        setShowMessage(true);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSuccessMessage = (message) => {
        return new Promise((resolve) => {
            setSuccessMessage(message);
            setShowMessage(true);

            setTimeout(() => {
                setShowMessage(false);
                resolve();
            }, 2000);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validateEmail = EMAIL_REGEX.test(email);
        const validatePassword = PASSWORD_REGEX.test(password);

        if (!validateEmail) {
            handleErrorMessage(EMAIL_ERROR_MESSAGE);
        } else {
            if (!validatePassword) {
                handleErrorMessage(PASSWORD_ERROR_MESSAGE);
            } else {
                try {
                    setLoading(true);

                    const response = await fetch("https://algorithm-aces.vercel.app/rest/auth/register", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({email, password}),
                    });

                    setLoading(false);

                    if (!response.ok) {
                        handleErrorMessage("Error creating client");
                    } else {
                        await handleSuccessMessage(SUCCESS_MESSAGE);
                        navigate("/login");
                    }

                } catch (error) {
                    handleErrorMessage("Error during client creation:");
                    setLoading(false);
                }
            }
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit} className="login-form">
                <p className={showMessage ? "feedback-message" : "offscreen"} aria-live="assertive">
                    {errorMessage || successMessage}
                </p>


                <h2>Register</h2>
                <label>
                    Email:
                    <input type="email" value={email} onChange={handleEmailChange}/>
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={handlePasswordChange}/>
                </label>
                <button
                    type="submit"
                    className="register-submit-button"
                    disabled={loading}>
                    {loading ? "Signing in..." : "Register"}
                </button>
            </form>
        </div>
    );
}

export default Register;
