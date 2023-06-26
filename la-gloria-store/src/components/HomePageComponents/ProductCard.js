import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";

function ProductCard(props) {
  const { id, name, image, price, enable, stock, getUpdatedStock } = props;
  const [isLoading, setIsLoading] = useState(true);

  function handleImageLoadError(e) {
    e.target.src = "/notfound.png";
  }

  function handleImageLoad() {
    setIsLoading(false);
  }

  function isProductAvailable() {
    return enable && getUpdatedStock(id, stock) > 0;
  }

  return (
    <div className="card">
      {isLoading && (
        <img
          src="loading.png"
          className="loading-image"
          alt="Loading"
        />
      )}
      <img
        src={image}
        className={`card-img-top ${isLoading ? "hidden" : ""}`}
        alt={name}
        onLoad={handleImageLoad}
        onError={handleImageLoadError}
      />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">${price}</p>
        <div className="text-center">
          {isProductAvailable() ? (
            <Link to={`/product/${id}`} className="btn card-button-details">
              See details
            </Link>
          ) : (
            <button className="btn card-button-details" disabled>
              Product Unavailable
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
