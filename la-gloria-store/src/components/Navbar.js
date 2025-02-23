// Navbar.js

import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import CartModal from "./ShoppingCart/CartModal";
import LoginWrapper from "./PageWrappers/LoginWrapper";
import "../styles/global.css";

function Navbar() {
  const [showCartModal, setShowCartModal] = useState(false);

    const toggleCartModal = (show) => {
        setShowCartModal(show);
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
            <div className="navbar-container">
                <div>
                    <Link
                        to="/"
                        className="navbar-brand"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Home"
                    >
                        <img
                            src="/logo.png"
                            alt="Logo"
                            width="25"
                            height="25"
                            className="d-inline-block align-text-top"
                        />{" "}
                        La Gloria Store
                    </Link>
                </div>
                <div className="navbar-buttons-container">
                    <LoginWrapper/>
                    <button
                        className="btn cart-button btn-sm"
                        onClick={() => toggleCartModal(true)}
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        aria-label="Shopping Cart"
                        title="Shopping Cart">
                        <i className="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>

        <CartModal
            showCartModal={showCartModal}
            handleCloseCart={() => toggleCartModal(false)}
        />
      </nav>
  );
}

export default Navbar;
