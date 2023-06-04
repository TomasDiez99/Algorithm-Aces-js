import React, {useState} from "react";
import EmailCheckoutModal from "./EmailCheckoutModal";
import "../../App.css";

function OrderDetailItem({orderDetail, onRemove}) {
    const {product_id, product_amount} = orderDetail;

    return (
        <tr>
            <td>{product_id}</td>
            <td>{product_amount}</td>
            <td>
                <button type="button" className="btn btn-danger" onClick={onRemove}>
                    Remove
                </button>
            </td>
        </tr>
    );
}

function ShoppingCart(props) {
    const {orderDetailList, handleOrderDetailList, handleCloseCart} = props;
    const [showEmailCheckoutModal, setShowEmailCheckoutModal] = useState(false);

    const handleShowModal = (show) => {
        setShowEmailCheckoutModal(show);
    };

    const handleRemoveOrderDetail = (index) => {
        const updatedOrderDetailList = orderDetailList.filter(
            (_, i) => i !== index
        );
        handleOrderDetailList(updatedOrderDetailList);
    };

    return (
        <div className="shopping-cart">
            <div className="table-container cart-table-container">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orderDetailList.map((orderDetail, index) => (
                        <OrderDetailItem
                            key={index}
                            orderDetail={orderDetail}
                            onRemove={() => handleRemoveOrderDetail(index)}
                        />
                    ))}
                    </tbody>
                </table>
            </div>

            <EmailCheckoutModal
                orderDetailList={orderDetailList}
                show={showEmailCheckoutModal}
                handleCloseEmailCheckoutModal={() => handleShowModal(false)}
                handleCloseCart={handleCloseCart}
                handleOrderDetailList={handleOrderDetailList}
            />
            <div className="modal-footer">
                <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={() => handleShowModal(true)}
                    disabled={orderDetailList.length === 0}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
}

export default ShoppingCart;
