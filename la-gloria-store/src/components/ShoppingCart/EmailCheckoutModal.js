import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import "../../App.css";

function EmailCheckoutModal(props) {
    const {
        orderProductPairList,
        handleOrderProductPairList,
        show,
        handleCloseEmailCheckoutModal,
        handleCloseCart,
    } = props;

    const [email, setEmail] = useState("");
    const [shoppingCart, setShoppingCart] = useState({
        total_price: 0,
        date: "",
        client_id: null,
        order_details: [],
    });

    const [success, setSuccess] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    useEffect(() => {
        if (shoppingCart.order_details.length > 0) {
            submitShoppingCart();
        }
    }, [shoppingCart]);

    const navigate = useNavigate();

    const clearOrderDetails = () => {
        handleOrderProductPairList([]);
        closeModals();
        resetAlertStates();
    }

    const resetAlertStates = () => {
        setSuccess(false);
        setShowErrorAlert(false);
    }

    const closeModals = () => {
        handleCloseEmailCheckoutModal();
        handleCloseCart();
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(
            `https://la-gloria-store-algorithm-aces.vercel.app/rest/clients/email/${email}`
        );

        if (response.ok) {
            const client = await response.json();
            const clientId = client.data.id;

            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().split("T")[0];

            const totalPrice = await calculateTotalPrice();
            const orderDetailList = await getOrderDetailList();

            const updatedShoppingCart = {
                ...shoppingCart,
                total_price: totalPrice,
                client_id: clientId,
                date: formattedDate,
                order_details: orderDetailList,
            };
            setShoppingCart(updatedShoppingCart);
        } else {
            setShowErrorAlert(true);
        }
    };

    const calculateTotalPrice = async () => {
        let totalPrice = 0;

        for (const [orderDetail, product] of orderProductPairList) {
            const productPrice = product.price;
            const productAmount = orderDetail.product_amount;

            const orderDetailPrice = productPrice * productAmount;
            totalPrice += orderDetailPrice;
        }

        return totalPrice;
    };

    const getOrderDetailList = async () => {
        let orderDetailList = [];

        for (const [orderDetail, product] of orderProductPairList) {
            orderDetailList.push(orderDetail);
        }

        return orderDetailList;
    }

    const submitShoppingCart = async () => {
        const jsonBody = JSON.stringify(shoppingCart);
        try {
            const response = await fetch(
                "https://la-gloria-store-algorithm-aces.vercel.app/rest/shopping-carts/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: jsonBody,
                }
            );
            if (response.ok) {
                setSuccess(true);
                setTimeout(() => {
                    clearOrderDetails();
                    navigate("/");
                }, 2000);
            }
        } catch (error) {
            clearOrderDetails();
            navigate("/error");
        }
    };


    return (
        <div
            className={`modal ${show ? "show" : ""}`}
            style={{display: show ? "block" : "none"}}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Checkout</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => {
                                handleCloseEmailCheckoutModal();
                                resetAlertStates();
                            }}

                        ></button>
                    </div>
                    <div className="modal-body">
                        {success && (
                            <div className="alert alert-success">Checkout successful!</div>
                        )}
                        {showErrorAlert && !success && (
                            <div className="alert alert-danger">Email not found</div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn checkout-button"
                                disabled={success}
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmailCheckoutModal;
