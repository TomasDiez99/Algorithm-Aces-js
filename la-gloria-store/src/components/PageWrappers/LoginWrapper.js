import React from "react";
import {useAuth} from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {Dropdown} from "react-bootstrap";
import "../../styles/global.css";
import "../../styles/navbar.css";
import { redirectIfOffline } from "../../utils";


function LoginWrapper() {
    const {auth, logOut} = useAuth();
    const navigate = useNavigate();


    const verifyAuthToken = () => {
        return auth?.accessToken ? renderDropdownMenu() : renderLoginButton();
    };

   /* const handleDropdownSelect = (selectedOption) => {
        if (selectedOption === "history") {
            navigate(`/history/${auth.email}`);
        } else if (selectedOption === "logout") {
            logOut();
        }
    };*/

    const handleDropdownSelect = (selectedOption) => {
        if (selectedOption === "history") {
            redirectIfOffline(navigate, `/history/${auth.email}`);
        } else if (selectedOption === "logout") {
            logOut();
        }
    };
/*
    const renderLoginButton = () => {
        return (<button
            className="btn login-button btn-sm"
            onClick={() => navigate("/login")}
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Login"
        >
            <i className="fas fa-user"></i>
        </button>);
    };
*/

const renderLoginButton = () => {
    return (
        <button
            className="btn login-button btn-sm"
            onClick={() => redirectIfOffline(navigate, "/login")}
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
            <Dropdown>
                <Dropdown.Toggle
                    variant=""
                    id="dropdown-basic"
                    className="btn dropdown-button btn-sm profile-button"
                >
                    <i className="fas fa-user"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item
                        onClick={() => handleDropdownSelect("history")}>
                        History
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDropdownSelect("logout")}>
                        Logout
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
            ;
    };

    return verifyAuthToken();
}

export default LoginWrapper;
