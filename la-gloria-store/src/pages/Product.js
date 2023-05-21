import logo from "../logo.svg";
import "../App.css";
import React, { useEffect, useState } from "react";

function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://la-gloria-store-algorithm-aces.vercel.app/rest/products"
        );
        const json = await response.json();
        setProducts(json.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [products]); // Agrega "products" como dependencia

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>PRODUCTTEST</p>
        <div>
          <h1>Products</h1>
          {products.length > 0 ? (
            <ul>
              {products.map((product) => (
                <li key={product.id}>
                  <h3>{product.name}</h3>
                  <p>Price: {product.price}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading products...</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default Product;
