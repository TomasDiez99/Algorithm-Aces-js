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

  const getUpdatedStock = (productId, oldStock) => {
    const getProductStockInCart = () => {
      let totalStock = 0;
      for (const pair of orderProductPairList) {
        const [product, _] = pair;
        if (product.product_id === productId) {
          totalStock += product.product_amount;
        }
      }
      return totalStock;
    };
  
    return oldStock - getProductStockInCart();
  };

  return (
    <div>
      <Navbar orderProductPairList={orderProductPairList} handleOrderProductPairList={handleOrderProductPairList} />
      <Routes>
        <Route 
        path="/" 
        element={<Home
          getUpdatedStock={getUpdatedStock}
        />} />
        <Route
          path="/product/:productId"
          element={<Product 
            orderProductPairList={orderProductPairList} 
            handleOrderProductPairList={handleOrderProductPairList} 
            addOrderProductPair={addOrderProductPair}
            getUpdatedStock = {getUpdatedStock}
             />}
        />
        <Route path="/history/:clientEmail" element={<HistoryPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
