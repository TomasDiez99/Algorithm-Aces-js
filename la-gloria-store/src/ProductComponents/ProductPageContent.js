import "../App.css";
import React, { useState } from "react";

import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

function ProductPageComponent(props) {
  const { product, addOrderDetails } = props;
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const orderDetail = {
      product_id: product.id,
      product_amount: quantity,
    };
    addOrderDetails(orderDetail);
  };

  const handleProductAmount = (newAmount, maxLimit) => {
    if (quantity >= 1 && quantity <= maxLimit) {
      setQuantity(newAmount);
    }
  };

  return (
    <MDBContainer>
      <MDBRow className="product-container">
        <div className="product-data-container">
          <MDBCol md="6">
            <div className="product-data-content">
              <h1>Product info</h1>
              {product ? (
                <div>
                  <h3>
                    <strong>{product.name}</strong>
                  </h3>
                  <h2>Current stock: {product.stock}</h2>
                  <p>Price: ${product.price}</p>
                  <p>Category: {product.category.name}</p>
                  <p>Brand: {product.brand.name}</p>
                  <div className="quantity-control">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() =>
                        handleProductAmount(quantity - 1, product.stock)
                      }
                      disabled={quantity === 1}
                    >
                      -
                    </button>
                    <span className="quantity">{quantity}</span>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() =>
                        handleProductAmount(quantity + 1, product.stock)
                      }
                      disabled={quantity === product.stock}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="btn btn-outline-success btn-lg"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                </div>
              ) : (
                <p>Loading product...</p>
              )}
            </div>
          </MDBCol>
        </div>
      </MDBRow>
    </MDBContainer>
  );
}
export default ProductPageComponent;
