import React, {useState} from "react";
import EmailCheckoutModal from "./EmailCheckoutModal";
import "../../App.css";

function OrderDetailItem({orderProductPair, onRemove}) {
    const {product_id, product_amount} = orderProductPair;

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
    const {orderProductPairList, handleOrderProductPairList, handleCloseCart} = props;
    const [showEmailCheckoutModal, setShowEmailCheckoutModal] = useState(false);

    const handleShowModal = (show) => {
        setShowEmailCheckoutModal(show);
    };

    const handleRemoveOrderDetail = (index) => {
        const orderProductPairList = orderProductPairList.filter(
            (_, i) => i !== index
        );
        handleOrderProductPairList(orderProductPairList);
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
                    {orderProductPairList.map((orderProductPair, index) => (
                        <OrderDetailItem
                            key={index}
                            orderProductPair={orderProductPair}
                            onRemove={() => handleRemoveOrderDetail(index)}
                        />
                    ))}
                    </tbody>
                </table>
            </div>

            <EmailCheckoutModal
                orderProductPairList={orderProductPairList}
                show={showEmailCheckoutModal}
                handleCloseEmailCheckoutModal={() => handleShowModal(false)}
                handleCloseCart={handleCloseCart}
                handleOrderProductPairList={handleOrderProductPairList}
            />
            <div className="modal-footer">
                <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={() => handleShowModal(true)}
                    disabled={orderProductPairList.length === 0}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
}

export default ShoppingCart;
