import React from "react";
import {MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBCol} from "mdbreact";

function ProductCarrousel(props) {
    const {product} = props;


    return (
        <div className="carousel-container">
            <MDBCol md="6">
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
                                    src= {product ? product.image : "https://2.bp.blogspot.com/-_Tx3nbVr5mM/U7ctz8a3LDI/AAAAAAAAAkM/YDDEPDIHjVE/s1600/escudoo.png"}
                                    alt="Imagen 1"
                                />
                            </MDBCarouselItem>
                        </MDBCarouselInner>
                    </MDBCarousel>
                </div>
            </MDBCol>
        </div>
    );
}
export default ProductCarrousel;