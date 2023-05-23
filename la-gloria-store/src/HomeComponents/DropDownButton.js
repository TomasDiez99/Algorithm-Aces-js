import LogInButton from './LogInButton';
import React, {useState} from "react";

function DropDownButton() {
    const [button, setButton] = useState('DropDownButton');

    const changeButton = () => {
        setButton('LogIn');
    }

    return (
        <React.Fragment>
            {button === 'DropDownButton' ? (
                <button className="btn" type="button" onClick={changeButton}>{button}</button>
            ) : (
                <LogInButton/>
            )}
        </React.Fragment>
    );
}

export default DropDownButton;



/*
function DropDownButton() {

    const[dropDownButton, setButton] = useState('Log In')

    const changeButton = () => {
        setButton('Log Out')
    }

    return (
        <div className="dropdown">
            <button
                className="btn btn-secondary dropdown-toggle "
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >

            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton" >
                <li>
                    <a className="dropdown-item" href="#">
                        My Profile
                    </a>
                </li>
                <li>
                    <button onClick={changeButton}>{dropDownButton}</button>
                </li>
            </ul>
        </div>
    );
}


export default DropDownButton;
*/
