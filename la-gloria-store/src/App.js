import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import ErrorPage from "./pages/ErrorPage";
import Navbar from "./HomeComponents/Navbar";
import Footer from "./HomeComponents/Footer";
import { useState } from "react";

function App() {
  const [orderDetailList, setOrderDetail] = useState([]);

  const addOrderDetails = (orderDetail) => {
    setOrderDetail((prevOrderDetailList) => [
      ...prevOrderDetailList,
      orderDetail,
    ]);
  };

  return (
    <div>
      <Navbar orderDetailList={orderDetailList} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/product/:productId"
          element={<Product addOrderDetails={addOrderDetails} />}
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
