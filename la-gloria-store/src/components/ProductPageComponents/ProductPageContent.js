import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/product-page.css";

function ProductPageComponent(props) {
  const {
    product,
    orderProductPairList,
    handleOrderProductPairList,
    addOrderProductPair,
  } = props;
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const orderDetail = {
      product_id: product.id,
      product_amount: quantity,
    };
    
    const existingPairIndex = orderProductPairList.findIndex(
      ([pairProduct, _]) => pairProduct.product_id === product.id
    );
    
    if (existingPairIndex !== -1) {
      const [existingOrderDetail, existingProduct] = orderProductPairList[existingPairIndex];
      const updatedProductAmount = existingOrderDetail.product_amount + quantity;
      
      const updatedOrderDetail = {
        product_id: existingProduct.id,
        product_amount: updatedProductAmount,
      };
      
      const updatedPairList = [...orderProductPairList];
      updatedPairList[existingPairIndex] = [updatedOrderDetail, existingProduct];
      
      handleOrderProductPairList(updatedPairList);
    } else {
      addOrderProductPair([orderDetail, product]);
    }

    setAddedToCart(true);
    navigate("/");
  };

  const getProductStockInCart = (productId) => {
    let totalStock = 0;
    for (const pair of orderProductPairList) {
      const [product, _] = pair;
      if (product.product_id === productId) {
        totalStock += product.product_amount;
      }
    }
    return totalStock;
  };

  const getUpdatedStock = (productId, oldStock) => {
    const cartStock = getProductStockInCart(productId);
    const newStock = oldStock - cartStock;
    return newStock;
  };

  const handleProductAmount = (newAmount) => {
    const updatedStock = getUpdatedStock(product.id, product.stock);
    if (newAmount >= 1 && newAmount <= updatedStock) {
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
          <h2>Current stock: {getUpdatedStock(product.id, product.stock)}</h2>
          <p>Price: ${product.price}</p>
          <p>Category: {product.category.name}</p>
          <p>Brand: {product.brand.name}</p>
          <div className="quantity-control">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => handleProductAmount(quantity - 1)}
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="quantity">{quantity}</span>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => handleProductAmount(quantity + 1)}
              disabled={quantity >= getUpdatedStock(product.id, product.stock)}
            >
              +
            </button>
          </div>
          <button
            className="btn btn-outline-success btn-lg"
            onClick={handleAddToCart}
            disabled={addedToCart || quantity > getUpdatedStock(product.id, product.stock)}
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
