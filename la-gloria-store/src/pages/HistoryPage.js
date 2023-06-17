import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import "../styles/history-page.css";

function HistoryPage() {
    const params = useParams();
    const email = params.clientEmail;
    const [shoppingCarts, setShoppingCarts] = useState([]);
    const [expandedRows, setExpandedRows] = useState([]);
    //const [orderDetails, setOrderDetails] = useState([]);
    const [orderDetailProductPairs, setOrderDetailProductPairs] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchShoppingCarts = async () => {
            try {
                const response = await fetch(
                    `https://la-gloria-store-algorithm-aces.vercel.app/rest/shopping-carts/history/${email}`
                );
                const data = await response.json();
                setShoppingCarts(data);
            } catch (error) {
                navigate("/error");
            }
        };

        fetchShoppingCarts();
    }, [email]);

    const getProduct = async (productId) => {
        try {
            const response = await fetch(
                `https://la-gloria-store-algorithm-aces.vercel.app/rest/products/id/${productId}`
            );
            if (response.ok) {
                const json = await response.json();
                return json.data;
            } else {
                navigate("/error");
            }
        } catch (error) {
            navigate("/error");
        }
    };
/*
    const createOrderDetailProductPair = async (orderDetail) => {
        const product = await getProduct(orderDetail.product_id);
        const orderDetailProductPair = [orderDetail, product];
        return orderDetailProductPair;
    };

    const getOrderDetailProductPairs = async () => {
        const pairs = await Promise.all(
            orderDetails.map(async (orderDetail) => {
                const orderDetailProductPair = await createOrderDetailProductPair(orderDetail);
                return orderDetailProductPair;
            })
        );
        return pairs;
    };
*/
    const fetchOrderDetails = async (shoppingCartId) => {
        try {
            const response = await fetch(
                `https://la-gloria-store-algorithm-aces.vercel.app/rest/order-details/shopping-cart/${shoppingCartId}`
            );
            const data = await response.json();
            const pairs = await Promise.all(
                data.map(async (orderDetail) => {
                    const product = await getProduct(orderDetail.product_id);
                    return [orderDetail, product];
                })
            );
            //setOrderDetails(data);
            setOrderDetailProductPairs(pairs);
        } catch (error) {
            navigate("/error");
        }
    };


    const handleRowClick = async (index, shoppingCartId) => {
        if (expandedRows.includes(index)) {
            // Si el botón ya está abierto, lo cerramos
            setExpandedRows([]);
        } else {
            // Si se hace clic en un nuevo botón, cerramos el anterior y abrimos el nuevo
            const newExpandedRows = [index];
            setExpandedRows(newExpandedRows);
            await fetchOrderDetails(shoppingCartId);
        }
    };



    return (
        <div>
            <h1 className="text-center">History</h1>
            <p className="text-center">{email}</p>
            <div className="table-wrapper">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Total Price</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {shoppingCarts.map((cart, index) => (
                        <React.Fragment key={cart.id}>
                            <tr>
                                <td>{cart.date}</td>
                                <td>${cart.total_price}</td>
                                <td>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => handleRowClick(index, cart.id)}
                                    >
                                        {expandedRows.includes(index) ? "-" : "+"}
                                    </button>
                                </td>
                            </tr>
                            {expandedRows.includes(index) && (
                                <tr>
                                    <td colSpan="3">
                                        <div className="order-details">
                                            <table>
                                                <thead>
                                                <tr>
                                                    <th>Product Amount</th>
                                                    <th>Product Name</th>
                                                    <th>Product Price</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {orderDetailProductPairs
                                                    .filter(([orderDetail]) => orderDetail.shopping_cart_id === cart.id)
                                                    .map(([orderDetail, product]) => (
                                                        <tr key={orderDetail.id}>
                                                            <td>{orderDetail.product_amount}</td>
                                                            <td>{product.name}</td>
                                                            <td>{product.price}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default HistoryPage;
