import React from "react";
import ShoppingCart from "./ShoppingCart";

function CartModal({
                       showCartModal,
                       handleCloseCart,
                       orderProductPairList,
                       handleOrderProductPairList,
                   }) {
    return (
        <div
            className={`modal ${showCartModal ? "show" : ""}`}
            tabIndex="-1"
            style={{display: showCartModal ? "block" : "none"}}
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
                            onClick={handleCloseCart}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <ShoppingCart
                            orderProductPairList={orderProductPairList}
                            handleCloseCart={handleCloseCart}
                            handleOrderProductPairList={handleOrderProductPairList}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartModal;
