import React, {useState, createContext} from "react";
import {useNavigate} from "react-router-dom";

const AuthContext = createContext({});
const LOGIN_ERROR_MESSAGE = "Wrong mail or password";

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleErrorMessage = (errorMsg)  => {
        setErrorMessage("The next error happened while logging: " + errorMsg);
    }

    const loginAuth = async (email, password) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/rest/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password}),
            });

            if (!response.ok) {
                handleErrorMessage(LOGIN_ERROR_MESSAGE);
            }
            else{
                const data = await response.json();
                const accessToken = data.authorization.token;

                setAuth({
                    email,
                    password,
                    accessToken
                });
                navigate("/");
            }
        } catch (error) {
            handleErrorMessage(LOGIN_ERROR_MESSAGE);
        }
    };

    const logOut = async () => {
        try {
            await fetch("http://127.0.0.1:8000/rest/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setAuth({});
            navigate("/");
        } catch (error) {
            console.error("error during logout", error);
            setAuth({});
            navigate("/");
        }
    }

    const isAuthenticated = () => !!auth.accessToken;

    return (
        <AuthContext.Provider value={{auth, setAuth, loginAuth, logOut, errorMessage,setErrorMessage,isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthContext;

