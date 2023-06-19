import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "../../styles/product-page.css";

function ProductPageComponent(props) {
    const {product, addOrderProductPair} = props;
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);
    const navigate = useNavigate();

    const handleAddToCart = () => {
        const orderDetail = {
            product_id: product.id,
            product_amount: quantity,
        };
        addOrderProductPair(orderDetail);
        setAddedToCart(true);
        navigate("/");
    };

    const handleProductAmount = (newAmount, maxLimit) => {
        if (quantity >= 1 && quantity <= maxLimit) {
            setQuantity(newAmount);
        }
    };

    return (
        <div className="center-content">
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
                            onClick={() => handleProductAmount(quantity - 1, product.stock)}
                            disabled={quantity === 1}
                        >
                            -
                        </button>
                        <span className="quantity">{quantity}</span>
                        <button
                            className="btn btn-primary btn-sm"
                            onClick={() => handleProductAmount(quantity + 1, product.stock)}
                            disabled={quantity === product.stock}
                        >
                            +
                        </button>
                    </div>
                    <button
                        className="btn btn-outline-success btn-lg"
                        onClick={handleAddToCart}
                        disabled={addedToCart}
                    >
                        Add to Cart
                    </button>
                </div>
            ) : (
                <p>Loading product...</p>
            )}
        </div>
    );
}

export default ProductPageComponent;
