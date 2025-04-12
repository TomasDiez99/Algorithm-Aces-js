import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import ErrorPage from "./pages/ErrorPage";
import HistoryPage from "./pages/HistoryPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import React, {useEffect, useState} from "react";
import Login from "./components/LoginComponents/Login";
import Register from "./components/LoginComponents/Register";
import {AuthProvider} from "./context/AuthProvider";
import {ShoppingCartProvider} from "./context/ShoppingCartProvider";
import RequireAuth from "./components/LoginComponents/RequiereAuth";
import MercadoPago from "./components/MercadoPagoComponents/MercadoPago";
import {ToastContainer} from 'react-toastify';
import PwaErrorPage from "./pages/PwaErrorPage";


function App() {

    const initialPage = 1;
    const [currentPage, setCurrentPage] = React.useState(initialPage);

    useEffect(() => {
        const loadTawk = () => {
            var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
            var s1 = document.createElement("script"),
                s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = 'https://embed.tawk.to/6754543d2480f5b4f5a99dfd/1iegmi4pq';
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            s0.parentNode.insertBefore(s1, s0);
        };

        if (navigator.onLine) {
            try {
                loadTawk();
            } catch (e) {
                console.error("Failed to load Tawk script:", e);
            }
        } else {
            console.warn("Tawk script not loaded: no internet connection.");
            window.addEventListener("online", () => {
                console.log("Back online, loading Tawk...");
                loadTawk();
            }, {once: true});
        }
    }, []);


    return (
        <AuthProvider>
            <ShoppingCartProvider>
                <div>
                    <Navbar
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        initialPage={initialPage}
                    />
                    <div className="pt-5">
                        <Routes>
                            <Route
                                path="/"
                                element={<Home
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                />}/>
                            <Route
                                path="/product/:productId"
                                element={<Product/>}
                            />
                            <Route
                                path="/history/:clientEmail"
                                element={<RequireAuth><HistoryPage/></RequireAuth>}
                            />
                            <Route path="/mercado-pago" element={<MercadoPago/>}/> {/* Nueva ruta para MercadoPago */}
                            <Route path="*" element={<ErrorPage/>}/>
                            <Route path="login" element={<Login/>}/>
                            <Route path="register" element={<Register/>}/>
                            <Route path="/errorPWA" element={<PwaErrorPage/>}/>
                        </Routes>
                    </div>

                    <Footer/>
                </div>
            </ShoppingCartProvider>
            <ToastContainer/>
        </AuthProvider>
    );
}

export default App;
