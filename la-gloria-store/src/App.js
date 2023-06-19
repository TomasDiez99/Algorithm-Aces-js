import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import ErrorPage from "./pages/ErrorPage";
import HistoryPage from "./pages/HistoryPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useState } from "react";

function App() {
  const [orderProductPairList, setOrderProductPairList] = useState([]);

  const addOrderProductPair = (orderProductPair) => {
    setOrderProductPairList((prevOrderProductPairList) => [
      ...prevOrderProductPairList,
      orderProductPair,
    ]);
  };

  const handleOrderProductPairList = (newOrderProductList) => {
    setOrderProductPairList(newOrderProductList);
  }

  return (
    <div>
      <Navbar orderProductPairList={orderProductPairList} handleOrderProductPairList={handleOrderProductPairList} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/product/:productId"
          element={<Product orderProductPairList={orderProductPairList} handleOrderProductPairList={handleOrderProductPairList} addOrderProductPair={addOrderProductPair} />}
        />
        <Route path="/history/:clientEmail" element={<HistoryPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
