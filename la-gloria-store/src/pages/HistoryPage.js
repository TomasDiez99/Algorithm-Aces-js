import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import "../styles/history-page.css";

function HistoryPage() {
    const params = useParams();
    const email = params.clientEmail;
    const [shoppingCarts, setShoppingCarts] = useState([]);
    const [expandedRows, setExpandedRows] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);

    useEffect(() => {
        const fetchShoppingCarts = async () => {
            try {
                const response = await fetch(
                    `https://la-gloria-store-algorithm-aces.vercel.app/rest/shopping-carts/history/${email}`
                );
                const data = await response.json();
                setShoppingCarts(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchShoppingCarts();
    }, [email]);

    const fetchOrderDetails = async (shoppingCartId) => {
        try {
            const response = await fetch(
                `https://la-gloria-store-algorithm-aces.vercel.app/rest/order-details/shopping-cart/${shoppingCartId}`
            );
            const data = await response.json();
            setOrderDetails(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleRowClick = async (index, shoppingCartId) => {
        const rowIndex = expandedRows.indexOf(index);
        const newExpandedRows = [...expandedRows];
        if (rowIndex === -1) {
            newExpandedRows.push(index);
            await fetchOrderDetails(shoppingCartId);
        } else {
            newExpandedRows.splice(rowIndex, 1);
        }
        setExpandedRows(newExpandedRows);
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
                                <td>{cart.total_price}</td>
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
                                                    <th>Created At</th>
                                                    <th>Product ID</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {orderDetails.map((orderDetail) => (
                                                    <tr key={orderDetail.id}>
                                                        <td>{orderDetail.product_amount}</td>
                                                        <td>{orderDetail.created_at.substring(0, 10) /*To get only the YYYY-MM-DD format*/}</td>
                                                        <td>{orderDetail.product_id}</td>
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
