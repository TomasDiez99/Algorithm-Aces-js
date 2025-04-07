import { MDBCarousel, MDBCarouselInner, MDBCarouselItem } from "mdbreact"
import "../../styles/product-page.css"

function ProductCarousel(props) {
  const { product } = props

  return (
    <MDBCarousel className="carousel-container carousel-dark" activeItem={1} length={1} showControls showIndicators>
      <MDBCarouselInner>
        <MDBCarouselItem className="carousel-image-wrapper" itemId="1">
          <img
            className="carousel-image"
            src={product ? product.image : "/loading.png"}
            alt={product ? product.name : "Loading product"}
            onError={(e) => {
              e.target.src = "/notfound.png"
            }}
          />
        </MDBCarouselItem>
      </MDBCarouselInner>
    </MDBCarousel>
  )
}

export default ProductCarousel

