/*import React, { useEffect, useState } from "react";

function LogInButton() {
    const [showPopup, setShowPopup] = useState(false);
    const [userInput, setUserInput] = useState("");
    const [clients, setClients] = useState([]);

    useEffect(() => {
        fetch('https://la-gloria-store-algorithm-aces.vercel.app/rest/clients')
            .then(response => response.json())
            .then((json) => {
                // Guardar los usuarios en el estado
                setClients(json.data);
            })
            .catch(error => {
                // Manejar errores aquí
                console.log(error);
            });
    }, []);

    const openPopup = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };

    const submitForm = () => {
        if (userInput !== "") {
            // Hacer algo con el valor ingresado por el usuario
            console.log("Texto ingresado:", userInput);
        }
        closePopup();
    };

    const isValidClient = (clientUsername) => {
        var userExist = false;
        if(clients.length > 0){
            for ()
        }
    }
    return (
        <React.Fragment>
            {!showPopup ? (
                <button className="btn" type="button" onClick={openPopup}>
                    Log In
                </button>
            ) : (
                <div className="popup">
                    <input
                        type="text"
                        value={userInput}
                        onChange={handleInputChange}
                        placeholder="Ingrese su usuario"
                    />
                    <button className="btn" type="button" onClick={submitForm}>
                        Aceptar
                    </button>
                </div>
            )}
        </React.Fragment>
    );
}

export default LogInButton;
*/


import DropDownButton from './DropDownButton';
import React, {useEffect, useState} from "react";


function LogInButton() {
    const [button, setButton] = useState('Log In');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://la-gloria-store-algorithm-aces.vercel.app/rest/clients/email/${email}`);
                if (response.ok) {
                    const clientJson = await response.json();
                    setEmail(clientJson.data.email);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [email]);

    const changeButton = () => {
        setButton('DropDownButton');
    }


    const validateClient = (email) => {
        if (email !== '') {
            //mostrar mensaje de error
        } else {

        }
    }

    return (
        <React.Fragment>
            {button === 'Log In' ? (
                <button className="btn" type="button" onClick={changeButton}>{button}</button>
            ) : (
                <DropDownButton/>
            )}
        </React.Fragment>
    );
}

export default LogInButton;
