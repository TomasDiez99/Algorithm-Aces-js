import React from "react";
import { CardPayment, initMercadoPago } from '@mercadopago/sdk-react';

const MercadoPago = () => {
    initMercadoPago('TEST-69fb160d-4a3e-4385-a038-a7320b91b5d8');

    const initialization = {
        amount: 100,
    };

    const onSubmit = async (formData) => {
        // callback llamado al hacer clic en el botón enviar datos
        return new Promise((resolve, reject) => {
            fetch('/process_payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then(response => response.json())
                .then(response => {
                    // recibir el resultado del pago
                    resolve();
                })
                .catch(error => {
                    // manejar la respuesta de error al intentar crear el pago
                    reject();
                });
        });
    };

    const onError = async (error) => {
        // callback llamado para todos los casos de error de Brick
        console.log(error);
    };

    const onReady = async () => {
        /*
        Callback llamado cuando Brick está listo.
        Aquí puedes ocultar cargamentos de su sitio, por ejemplo.
        */
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