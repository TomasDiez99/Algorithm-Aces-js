import "../App.css";
import React, { useState } from "react";

import {
    MDBContainer,
    MDBRow,
    MDBCol,
} from "mdbreact";

function ProductPageComponent(props) {
    const {product} = props;
    const [quantity, setQuantity] = useState(1);

    const handleProductAmount = (newAmount) => {
        if (quantity >= 1) {
            setQuantity(newAmount);
        }
    };

    const handleAddToCart = () => {
        console.log(`Adding ${quantity} ${product.name} to cart...`);
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
                                    <h3><strong>{product.name}</strong></h3>
                                    <p>Price: ${product.price}</p>
                                    <p>Category: {product.category.name}</p>
                                    <p>Brand: {product.brand.name}</p>
                                    <div className="quantity-control">
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => handleProductAmount(quantity - 1)}
                                            disabled={quantity === 1}
                                        >
                                            -
                                        </button>
                                        <span className="quantity">{quantity}</span>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => handleProductAmount(quantity + 1)}
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
