import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import ErrorPage from "./pages/ErrorPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useState } from "react";

function App() {
  const [orderDetailList, setOrderDetailList] = useState([]);

  const addOrderDetails = (orderDetail) => {
    setOrderDetailList((prevOrderDetailList) => [
      ...prevOrderDetailList,
      orderDetail,
    ]);
  };

  const handleOrderDetailList = (newOrderDetailList) => {
    setOrderDetailList(newOrderDetailList);
  }

  return (
    <div>
      <Navbar orderDetailList={orderDetailList} handleOrderDetailList={handleOrderDetailList} />
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
