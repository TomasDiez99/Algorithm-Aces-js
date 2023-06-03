import { Link } from "react-router-dom";
import "../../styles/home.css";

function ProductCard(props) {
    const { id, name, image, price, enable } = props;

    return (
        <div className="card">
            <img src={image} className="card-img-top" alt={name} />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">${price}</p>
                <div className="text-center">
                    {enable ? (
                        <Link to={`/product/${id}`} className="btn btn-primary">
                            See details
                        </Link>
                    ) : (
                        <button className="btn btn-primary" disabled>
                            Product Unavailable
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductCard;