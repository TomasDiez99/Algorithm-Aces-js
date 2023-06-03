import React, { useState } from "react";
import { Link } from "react-router-dom";
import ShoppingCart from "../ProductComponents/ShoppingCart";

function Navbar(prop) {
  const { orderDetailList, handleOrderDetailList } = prop;
  const [email, setEmail] = useState("");

  const [showCartModal, setShowCartModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const handleShowCart = (show) => {
    setShowCartModal(show);
  };

  const handleShowHistory = (show) => {
    setShowHistoryModal(show);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("sara cunta tunga tunga");
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

          <button
            className="btn btn-success"
            onClick={() => handleShowHistory(true)}
          >
            <i className="fa-thin fa-cart-shopping"></i> History
          </button>
        </div>
      </div>

      {/* Cart Modal */}
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
              <ShoppingCart
                orderDetailList={orderDetailList}
                handleCloseCart={() => handleShowCart(false)}
                handleOrderDetailList={handleOrderDetailList}
              />
            </div>
          </div>
        </div>
      </div>

      {/* History Modal */}
      <div
        className={`modal ${showHistoryModal ? "show" : ""}`}
        tabIndex="-1"
        style={{ display: showHistoryModal ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Shopping cart history</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => handleShowHistory(false)}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter client email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  See history
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
