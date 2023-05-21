import logo from "../logo.svg";
import "../App.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Product() {
  const [product, setProduct] = useState(null);
  const params = useParams();
  const productId = params.productId;

  useEffect(() => {
    const fetchData = async (productId) => {
      try {
        const response = await fetch(
          `https://la-gloria-store-algorithm-aces.vercel.app/rest/products/${productId}`
        );
        if (response.ok) {
          const json = await response.json();
          setProduct(json.data);
        } else {
          throw new Error("Error fetching product: " + response.status);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(productId);
  }, [productId]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>PRODUCTTEST</p>
        <div>
          <h1>Product</h1>
          {product ? (
            <div>
              <h3>Name: {product.name}</h3>
              <p>Price: {product.price}</p>
            </div>
          ) : (
            <p>Loading product...</p>
          )}
        </div>
      </header>
    </div>
  );
}
export default Product;
