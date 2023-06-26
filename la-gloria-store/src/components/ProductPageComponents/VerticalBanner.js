import React from "react";
import "../../styles/product-page.css";

const VerticalBanner = () => {
  return (
    <div className="banner-container">
      <img
        src="/adbanners/banner.jpg"
        alt="Vertical Ad Banner"
        className="vertical-banner img-fluid"
        onError={(e) => {
            e.target.src = "/notfound.png";
          }}
      />
    </div>
  );
};

export default VerticalBanner;
