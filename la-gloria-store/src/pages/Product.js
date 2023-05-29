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

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          {/* Carrusel */}
          <MDBCarousel activeItem={1} length={3} showControls showIndicators>
            <MDBCarouselInner>
              <MDBCarouselItem itemId="1">
                <img
                  className="d-block w-100"
                  src="imagen1.jpg"
                  alt="Imagen 1"
                />
              </MDBCarouselItem>
              <MDBCarouselItem itemId="2">
                <img
                  className="d-block w-100"
                  src="imagen2.jpg"
                  alt="Imagen 2"
                />
              </MDBCarouselItem>
              <MDBCarouselItem itemId="3">
                <img
                  className="d-block w-100"
                  src="imagen3.jpg"
                  alt="Imagen 3"
                />
              </MDBCarouselItem>
            </MDBCarouselInner>
          </MDBCarousel>
        </MDBCol>
        <MDBCol md="6">
          {/* Texto de prueba */}
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
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
export default Product;
