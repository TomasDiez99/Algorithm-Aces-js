import React from "react";
import {CardPayment, initMercadoPago} from '@mercadopago/sdk-react';
import {useShoppingCart} from "../../hooks/useShoppingCart";
import {useAuth} from "../../hooks/useAuth";
import {handleResponse} from "./paymentHandlers";
import {forApi} from "../../urlManager";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom";

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
        console.log("total: ", total);
        return total;
    }

    const onSubmit = async (formData) => {
        console.log("formData: ", formData);

        try {

            console.log("auth: ", auth);

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

            console.log("paymentDataJSON : ", paymentDataJSON);

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
            const result = jsonData['payment'];
            console.log("Response result: ", jsonData);
            handleResponse(result.status, result.status_detail);

            if (result.status === "approved") {
                handleOrderProductPairList([]); //clear the shopping cart
            }
            navigate("/");

        } catch (error) {
            console.log("Error onSubmit: ", error);
            navigate("/");
        }
    }

    const onError = async (error) => {
        console.log("Entro en el onError: ", error);
    };


    const initialization = {
        amount: getShoppingCartTotalPrice(),
        payer: {
            email: auth.email,
        }
    };

    const onReady = async () => {
        console.log("cargado exitosamente");
        console.log("initialization: ", initialization);
    };

    return (
        <>
            <CardPayment
                initialization={initialization}
                onSubmit={onSubmit}
                onReady={onReady}
                onError={onError}
            />
            {/* <ToastContainer /> */}
        </>
    );
};

export default MercadoPago;