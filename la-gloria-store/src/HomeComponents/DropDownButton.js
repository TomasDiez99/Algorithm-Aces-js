import React from 'react';

const DropDownButton = () => {
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
                    <a className="dropdown-item" href="#">
                        Log Out
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default DropDownButton;
