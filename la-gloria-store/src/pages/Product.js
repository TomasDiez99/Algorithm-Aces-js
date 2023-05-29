import "../App.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
} from "mdbreact";

function Product() {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const productId = params.productId;

  useEffect(() => {
    const fetchData = async (productId) => {
      try {
        const response = await fetch(
          `https://la-gloria-store-algorithm-aces.vercel.app/rest/products/id/${productId}`
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
        <div className="carousel-container">
          <MDBCol md="6">
            {/* Carrusel */}
            <div className="carousel-wrapper">
              <MDBCarousel
                activeItem={1}
                length={1}
                showControls
                showIndicators
              >
                <MDBCarouselInner>
                  <MDBCarouselItem itemId="1">
                    <img
                      className="carousel-image"
                      src="https://2.bp.blogspot.com/-_Tx3nbVr5mM/U7ctz8a3LDI/AAAAAAAAAkM/YDDEPDIHjVE/s1600/escudoo.png"
                      alt="Imagen 1"
                    />
                  </MDBCarouselItem>
                </MDBCarouselInner>
              </MDBCarousel>
            </div>
          </MDBCol>
        </div>
        <div className="product-data-container">
          <MDBCol md="6">
            <div className="product-data-content">
              <h1>Product info</h1>
              {product ? (
                <div>
                  <h3>
                    <strong>{product.name}</strong>
                  </h3>
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
export default Product;
