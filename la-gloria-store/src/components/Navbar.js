import React, { useState } from "react";
import { Link } from "react-router-dom";
import CartModal from "./ShoppingCart/CartModal";
import HistoryModal from "./HistoryModal";
import "../styles/global.css";

function Navbar(prop) {
  const { orderProductPairList, handleOrderProductPairList } = prop;
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

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid d-flex justify-content-between">
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
        <div>
          <button
            className="btn cart-button btn-sm"
            onClick={() => toggleCartModal(true)}
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Shopping Cart"
          >
            <i className="fas fa-shopping-cart"></i>
          </button>
          <button
            className="btn history-button btn-sm"
            onClick={() => toggleHistoryModal(true)}
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="History"
          >
            <i className="fa-thin fa-cart-shopping"></i> History
          </button>
        </div>
      </div>

      <CartModal
        showCartModal={showCartModal}
        handleCloseCart={() => toggleCartModal(false)}
        orderProductPairList={orderProductPairList}
        handleOrderProductPairList={handleOrderProductPairList}
      />
      <HistoryModal
        showHistoryModal={showHistoryModal}
        handleShowHistory={toggleHistoryModal}
        handleEmailChange={handleEmailChange}
      />
    </nav>
  );
}

export default Navbar;
