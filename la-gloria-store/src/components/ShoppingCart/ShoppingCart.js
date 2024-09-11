import React, {useState} from "react";
import EmailCheckoutModal from "./EmailCheckoutModal";
import "../../App.css";

function OrderDetailItem({ orderDetail, product, onRemove }) {

    return (
        <tr>
            <td>{product.name}</td>
            <td>${product.price}</td>
            <td>{orderDetail.product_amount}</td>
            <td>
                <button type="button" className="btn remove-button" onClick={onRemove}>
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
        const updatedOrderProductPairList = orderProductPairList.filter(
            (_, i) => i !== index
        );
        handleOrderProductPairList(updatedOrderProductPairList);
    };

    return (
        <div className="shopping-cart">
            <div className="table-container cart-table-container">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Product Price</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orderProductPairList.map(([orderDetail, product], index) => (
                        <OrderDetailItem
                            key={index}
                            orderDetail={orderDetail}
                            product={product}
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
                    className="btn checkout-button"
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
