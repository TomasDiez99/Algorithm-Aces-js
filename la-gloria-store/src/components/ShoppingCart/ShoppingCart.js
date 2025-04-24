import React, {useState} from "react";
import EmailCheckoutModal from "./EmailCheckoutModal";
import "../../App.css";
import {useShoppingCart} from "../../hooks/useShoppingCart";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OrderDetailItem({orderDetail, product, onRemove}) {
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
    const {handleCloseCart} = props;
    const {orderProductPairList, handleOrderProductPairList} = useShoppingCart();
    const [showEmailCheckoutModal, setShowEmailCheckoutModal] = useState(false);
    const navigate = useNavigate();
    const {auth} = useAuth();

    const handleShowModal = (show) => {
        setShowEmailCheckoutModal(show);
    };

    const handleRemoveOrderDetail = (index) => {
        const updatedOrderProductPairList = orderProductPairList.filter(
            (_, i) => i !== index
        );
        handleOrderProductPairList(updatedOrderProductPairList);
    };

    function handleMercadoPagoPayment() {
        handleCloseCart();
        if(!navigator.onLine ){
            navigate("/error");
        }
        else{
            if(!!auth.accessToken)  {
                navigate("/mercado-pago");
            } 
            else {
                toast.info("You need to be logged in to proceed with the payment");
                navigate ("/login")
            }
        }      
    }

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
                show={showEmailCheckoutModal}
                handleCloseEmailCheckoutModal={() => handleShowModal(false)}
                handleCloseCart={handleCloseCart}
            />
            <div className="modal-footer">
                <button
                    type="button"
                    className="btn checkout-button"
                    data-bs-dismiss="modal"
                    onClick={() => handleMercadoPagoPayment()}
                    aria-label="Checkout button"
                    disabled={orderProductPairList.length === 0}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
}

export default ShoppingCart;
