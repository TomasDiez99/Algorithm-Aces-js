import React, { useState } from "react";
import { Link } from "react-router-dom";
import ShoppingCart from "../ProductComponents/ShoppingCart";

function Navbar(prop) {
  const { orderDetailList } = prop;

  const [showCartModal, setShowCartModal] = useState(false);

  const handleShowCart = (show) => {
    setShowCartModal(show);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img
            src="https://2.bp.blogspot.com/-_Tx3nbVr5mM/U7ctz8a3LDI/AAAAAAAAAkM/YDDEPDIHjVE/s1600/escudoo.png"
            alt="Logo"
            width="30"
            height="30"
            className="d-inline-block align-text-top"
          />{" "}
          La Gloria Store
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <button
            className="btn btn-primary"
            onClick={() => handleShowCart(true)}
          >
            <i className="fa-thin fa-cart-shopping"></i> Cart
          </button>
        </div>
      </div>

      {/* Modal */}
      <div
        className={`modal ${showCartModal ? "show" : ""}`}
        tabIndex="-1"
        style={{ display: showCartModal ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Shopping Cart</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => handleShowCart(false)}
              ></button>
            </div>
            <div className="modal-body">
              <ShoppingCart orderDetailList={orderDetailList} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
