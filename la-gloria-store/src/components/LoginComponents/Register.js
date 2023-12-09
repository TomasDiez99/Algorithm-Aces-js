import React, { useState } from "react";
import "../../styles/global.css";
import "../../styles/login.css";
import {useNavigate} from "react-router-dom";

const EMAIL_REGEX = /.+@.+\.[A-Za-z]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Register() {
    const navigate = useNavigate();
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

        const vEmail = EMAIL_REGEX.test(email);
        const vPassword = PASSWORD_REGEX.test(password);
        if(!vEmail || !vPassword){
            console.log("email or password invalid")
        }
        else{
            try {
                const response = await fetch("http://127.0.0.1:8000/rest/auth/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({email, password}),
                });

                if (!response.ok) {
                    throw new Error("error creating client");
                }
                else {
                    console.log("client registered")
                }

                navigate("/");
            } catch (error) {
                console.error("Error during client creation:", error);
                navigate("/error");
            }
        }

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
