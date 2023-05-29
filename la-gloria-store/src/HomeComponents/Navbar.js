import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    <img src="https://2.bp.blogspot.com/-_Tx3nbVr5mM/U7ctz8a3LDI/AAAAAAAAAkM/YDDEPDIHjVE/s1600/escudoo.png" alt="Logo" width="30" height="30" className="d-inline-block align-text-top"/>{' '}
                    La Gloria Store
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
