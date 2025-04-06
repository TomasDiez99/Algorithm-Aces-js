import React, {useState, createContext} from "react";
import {useNavigate} from "react-router-dom";

const AuthContext = createContext({});
const LOGIN_ERROR_MESSAGE = "Wrong mail or password";

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleErrorMessage = (errorMsg) => {
        setErrorMessage("The next error happened while logging: " + errorMsg);
    }

    const loginAuth = async (email, password) => {
        try {
            const response = await fetch("https://algorithm-aces.vercel.app/rest/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password}),
            });

            if (!response.ok) {
                handleErrorMessage(LOGIN_ERROR_MESSAGE);
            } else {
                const data = await response.json();
                const accessToken = data.authorization.token;

                const clientDataResponse = await fetch(
                    `https://algorithm-aces.vercel.app/rest/clients/email/${email}`
                );

                let client_id = -1;
                if (clientDataResponse.ok) {
                    const client = await clientDataResponse.json();
                    client_id = client.data.id;
                }

                setAuth({
                    email,
                    client_id,
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
            const response = await fetch("https://algorithm-aces.vercel.app/rest/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth.accessToken}`
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
        <AuthContext.Provider
            value={{auth, setAuth, loginAuth, logOut, errorMessage, setErrorMessage, isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthContext;

