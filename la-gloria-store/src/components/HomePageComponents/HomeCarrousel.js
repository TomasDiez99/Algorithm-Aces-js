import React from "react";
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem } from "mdbreact";
import "../../styles/home.css";

const HomeCarrousel = () => {
  const imageUrls = [
    "/HomeCarrouselBanners/banner1.jpg",
    "/HomeCarrouselBanners/banner2.jpg",
    "/HomeCarrouselBanners/banner3.jpg",
    "/HomeCarrouselBanners/banner4.jpg",
    "/HomeCarrouselBanners/banner5.jpg",
  ];

  const carouselItems = [];
  for (let i = 0; i < imageUrls.length; i++) {
    const imageUrl = imageUrls[i];
    const itemId = (i + 1).toString();

    carouselItems.push(
      <MDBCarouselItem key={i} itemId={itemId}>
        <img
          className="w-100 home-carousel-img"
          src={imageUrl}
          alt={`Banner ${i + 1}`}
          onError={(e) => {
            e.target.src = "/notfound.png";
          }}
        />
      </MDBCarouselItem>
    );
  }

  return (
    <div className="carousel-wrapper">
      <MDBCarousel
        activeItem={1}
        length={imageUrls.length}
        showControls={true}
        showIndicators={true}
        className="z-depth-1 home-carousel-container"
      >
        <MDBCarouselInner>{carouselItems}</MDBCarouselInner>
      </MDBCarousel>
    </div>
  );
};

export default HomeCarrousel;
