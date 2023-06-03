import React, { useState } from "react";
import EmailCheckoutModal from "./EmailCheckoutModal";

function ShoppingCart(props) {
  const { orderDetailList, handleOrderDetailList, handleCloseCart } = props;
  const [showEmailCheckoutModal, setShowEmailCheckoutModal] = useState(false);

  const handleShowModal = (show) => {
    setShowEmailCheckoutModal(show);
  };

  return (
    <div className="shopping-cart">
      {orderDetailList.map((orderDetail, index) => (
        <div key={index} className="cart-item">
          <h4 className="item-title">Order Detail {index + 1}</h4>
          <div className="item-details">
            <div className="detail-row">
              <span className="detail-label">Product ID:</span>
              <span className="detail-value">{orderDetail.product_id}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Quantity:</span>
              <span className="detail-value">{orderDetail.product_amount}</span>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        className="btn btn-secondary"
        data-bs-dismiss="modal"
        onClick={() => handleShowModal(true)}
        disabled={orderDetailList.length === 0}
      >
        Checkout
      </button>
      <EmailCheckoutModal
        orderDetailList = {orderDetailList}
        show={showEmailCheckoutModal}
        handleCloseEmailCheckoutModal={() => handleShowModal(false)}
        handleCloseCart={handleCloseCart}
        handleOrderDetailList={handleOrderDetailList}
      />
    </div>
  );
}

export default ShoppingCart;
