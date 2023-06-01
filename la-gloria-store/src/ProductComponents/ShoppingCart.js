import React from "react";

function ShoppingCart(props) {
    const { orderDetailList } = props;

    return (
        <div className="shopping-cart">
            {orderDetailList.map((orderDetail, index) => (
                <div key={index} className="cart-item">
                    <h4 className="item-title">Order Detail {index + 1}:</h4>
                    <div className="item-details">
                        <div className="detail-row">
                            <span className="detail-label">Product ID:</span>
                            <span className="detail-value">{orderDetail.product_id}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Quantity:</span>
                            <span className="detail-value">{orderDetail.quantity}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ShoppingCart;
