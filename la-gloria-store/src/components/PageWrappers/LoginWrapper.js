import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {DropdownButton, Dropdown} from "react-bootstrap";
import "../../styles/global.css";

function LoginWrapper() {
    const { auth, logOut } = useAuth();
    const navigate = useNavigate();


    const verifyAuthToken = () => {
       return auth?.accessToken ? renderDropdownMenu() : renderLoginButton();
    };

    const handleDropdownSelect = (selectedOption) => {
        if (selectedOption === "history") {
            navigate(`/history/${auth.email}`);
        } else if (selectedOption === "logout") {
            logOut();
        }
    };

    const renderLoginButton = () => {
        return (
            <button
                className="btn login-button btn-sm"
                onClick={() => navigate("/login")}
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="Login"
            >
                <i className="fas fa-user"></i>
            </button>
        );
    };

    const renderDropdownMenu = () => {
        return (
            <DropdownButton
                variant={""}
                className="btn dropdown-button btn-sm"
                title={<i className="fas fa-user"></i>}
                id="dropdown-basic"
            >
                <Dropdown.Item onClick={() => handleDropdownSelect("history")}>
                    History
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleDropdownSelect("logout")}>
                    Logout
                </Dropdown.Item>
            </DropdownButton>
        );
    };


    return verifyAuthToken();
}

export default LoginWrapper;
