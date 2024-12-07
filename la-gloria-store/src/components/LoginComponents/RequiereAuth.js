import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";

const RequireAuth = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};

export default RequireAuth;
