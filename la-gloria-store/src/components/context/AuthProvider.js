import React, {useState, createContext} from "react";
import {useNavigate} from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});
    const navigate = useNavigate();
    const loginAuth = async (email, password) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/rest/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error("Authentication failed");
            }

            const data = await response.json();
            const accessToken = data.authorization.token;
            console.log(accessToken);
            setAuth({
                email,
                password,
                accessToken
            });
            navigate("/");
        } catch (error) {
            console.error("Error during login:", error);
            //navigate("/error");
        }
    };

    return (
        <AuthContext.Provider value={{auth,setAuth,loginAuth}}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthContext;

