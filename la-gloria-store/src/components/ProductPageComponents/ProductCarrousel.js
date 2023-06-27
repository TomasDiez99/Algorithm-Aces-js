import React from "react";
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem } from "mdbreact";
import "../../styles/product-page.css";

function ProductCarousel(props) {
  const { product } = props;

  return (
    <MDBCarousel
      className="carousel-container carousel-dark" // Agrega la clase carousel-dark aquí
      activeItem={1}
      length={1}
      showControls
      showIndicators
    >
      <MDBCarouselInner>
        <MDBCarouselItem className="carousel-image-wrapper" itemId="1">
          <div className="debug-2">
            <img
              className="carousel-image"
              src={product ? product.image : "/loading.png"}
              alt="Imagen 1"
              onError={(e) => {
                e.target.src = "/notfound.png";
              }}
            />
          </div>
        </MDBCarouselItem>
      </MDBCarouselInner>
    </MDBCarousel>
  );
}

export default ProductCarousel;
