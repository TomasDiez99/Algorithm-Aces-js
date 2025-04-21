import React from "react";
import {CardPayment, initMercadoPago} from '@mercadopago/sdk-react';
import {useShoppingCart} from "../../hooks/useShoppingCart";
import {useAuth} from "../../hooks/useAuth";
import {handleResponse} from "./paymentHandlers";
import {forApi} from "../../urlManager";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom";
import "../../styles/mercado-pago.css";


const MercadoPago = () => {
    const {auth} = useAuth();
    const {orderProductPairList, handleOrderProductPairList} = useShoppingCart();
    const navigate = useNavigate();

    const url = forApi("payment/create");

    initMercadoPago(
        'TEST-69fb160d-4a3e-4385-a038-a7320b91b5d8',
        {
            locale: "en-US",
        }
    );

    function getShoppingCartTotalPrice() {
        let total = 0;
        for (const [orderDetail, product] of orderProductPairList) {
            const productPrice = product.price;
            const productAmount = orderDetail.product_amount;
            const orderDetailPrice = productPrice * productAmount;
            total += orderDetailPrice;
        }
        return total;
    }

    const onSubmit = async (formData) => {

        try {


            // shoppingCartData Json
            const shoppingCartData = {
                total_price: getShoppingCartTotalPrice(),
                client_id: auth.client_id,
                date: new Date().toISOString().split("T")[0],
                order_details: orderProductPairList
            }

            let paymentDataJSON = {
                ...formData,
                shoppingCartData
            };


            const paymentData = JSON.stringify(paymentDataJSON);

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"//,
                    //Authorization: `Bearer ${auth.accessToken}`,
                },
                body: paymentData,
            });

            const jsonData = await response.json();
            if(jsonData.error === "Product amount is greater than product stock."){
                const statusError = "rejected";
                const status_detailError = "cc_rejected_other_reason"
                handleResponse(statusError, status_detailError);

                handleOrderProductPairList([]); //clear the shopping cart
                navigate("/");
            }
            else{
                const result = jsonData['payment'];
                handleResponse(result.status, result.status_detail);
    
                if (result.status === "approved") {
                    handleOrderProductPairList([]); //clear the shopping cart
                }
                navigate("/");
            }
           

        } catch (error) {
            handleOrderProductPairList([]); //clear the shopping cart
            navigate("/error");
        }
    }

    const onError = async (error) => {
    };


    const initialization = {
        amount: getShoppingCartTotalPrice(),
        payer: {
            email: auth.email,
        }
    };

    const onReady = async () => {
    };

    return (
        <>

        <div className="mp-main-container">
            <CardPayment
                initialization={initialization}
                onSubmit={onSubmit}
                onReady={onReady}
                onError={onError}
            />
        </div>
        </>
    );
};

export default MercadoPago;