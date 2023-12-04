import React from "react";
import "../../styles/product-page.css";

const VerticalBanner = () => {
  return (
    <div className="banner-container">
      <img
        src="/clickhere.jpg"
        alt="Vertical Ad Banner"
        className="vertical-banner"
        onError={(e) => {
          e.target.src = "/notfound.png";
        }}
      />
      
    </div>
  );
};


export default VerticalBanner;
