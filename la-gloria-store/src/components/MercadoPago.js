import React from "react";
import {CardPayment, initMercadoPago} from '@mercadopago/sdk-react';
import {useShoppingCart} from "../hooks/useShoppingCart";
import {useAuth} from "../hooks/useAuth";
import {forApi} from "../urlManager";

const MercadoPago = () => {
    const {auth} = useAuth();
    const {orderProductPairList} = useShoppingCart();
    // const url = forApi("/process_payment");
    //localhost url
    const url = "http://localhost:3001/rest/payment/create";
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
            const paymentData = JSON.stringify({
                ...formData,
                orderProductPairList
            });

            console.log("paymentData adentro de try catch: ", paymentData);

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.accessToken}`,
                },
                body: paymentData,
            });
        } catch (error) {
            console.log("error en el pago: ", error);
        }
    }

    const onError = async (error) => {
        console.log("error en el pago: ", error);
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
        <CardPayment
            initialization={initialization}
            onSubmit={onSubmit}
            onReady={onReady}
            onError={onError}
        />
    );
};

export default MercadoPago;