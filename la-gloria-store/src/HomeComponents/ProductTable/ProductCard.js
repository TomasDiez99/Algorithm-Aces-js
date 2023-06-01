import { Link } from "react-router-dom";
import "../home.css";

function ProductCard(props) {
  const { id, name, image, price } = props;

  return (
    <div className="card">
      <img
        src="https://2.bp.blogspot.com/-_Tx3nbVr5mM/U7ctz8a3LDI/AAAAAAAAAkM/YDDEPDIHjVE/s1600/escudoo.png"
        className="card-img-top"
        alt={name}
      />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">${price}</p>
        <div className="text-center">
          <Link to={`/product/${id}`} className="btn btn-primary">
            See details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
