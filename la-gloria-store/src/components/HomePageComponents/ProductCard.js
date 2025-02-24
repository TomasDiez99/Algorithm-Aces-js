import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { useShoppingCart } from "../../hooks/useShoppingCart";
import {useNavigate} from "react-router-dom";
import { redirectIfOffline } from "../../utils";

function ProductCard(props) {
  const { id, name, image, price, enable, stock} = props;
  const {getUpdatedStock} = useShoppingCart();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  function handleSeeDetails() {
    redirectIfOffline(navigate, `/product/${id}`);
  }

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
      <div className="card-img-wrapper">
        {isLoading && (
          <img
            src="loading.png"
            className="loading-image img-fluid"
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
      </div>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">${price}</p>
        <div className="text-center">
          {isProductAvailable() ? (
            <button className="btn card-button-details" onClick={handleSeeDetails}>
              See details
            </button>
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
