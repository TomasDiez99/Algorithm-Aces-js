import React from "react";
import {MDBCarousel, MDBCarouselInner, MDBCarouselItem} from "mdbreact";
import "../../styles/product-page.css";

function ProductCarrousel(props) {
    const {product} = props;

    return (
        <div className="carousel-container">
            <MDBCarousel activeItem={1} length={1} showControls showIndicators>
                <MDBCarouselInner>
                    <MDBCarouselItem itemId="1">
                        <img
                            className="carousel-image"
                            src={
                                product
                                    ? product.image
                                    : "/loading.png"
                            }
                            alt="Imagen 1"
                        />
                    </MDBCarouselItem>
                </MDBCarouselInner>
            </MDBCarousel>
        </div>
    );
}

export default ProductCarrousel;
