import React, { useState } from "react";
import { Link } from "react-router-dom";
import CartModal from "./CartModal";
import HistoryModal from "./HistoryModal";

function Navbar(prop) {
  const { orderDetailList, handleOrderDetailList } = prop;
  const [email, setEmail] = useState("");

  const [showCartModal, setShowCartModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const toggleCartModal = (show) => {
    setShowCartModal(show);
  };

  const toggleHistoryModal = (show) => {
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
            onClick={() => toggleCartModal(true)}
          >
            <i className="fa-thin fa-cart-shopping"></i> Cart
          </button>

          <button
            className="btn btn-success"
            onClick={() => toggleHistoryModal(true)}
          >
            <i className="fa-thin fa-cart-shopping"></i> History
          </button>
        </div>
      </div>

      <CartModal
        showCartModal={showCartModal}
        handleCloseCart={() => toggleCartModal(false)}
        orderDetailList={orderDetailList}
        handleOrderDetailList={handleOrderDetailList}
      />
      <HistoryModal
        showHistoryModal={showHistoryModal}
        handleShowHistory={toggleHistoryModal}
        email={email}
        handleEmailChange={handleEmailChange}
        handleSubmit={handleSubmit}
      />
    </nav>
  );
}

export default Navbar;
