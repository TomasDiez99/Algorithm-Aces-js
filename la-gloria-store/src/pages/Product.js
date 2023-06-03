import React, { useEffect, useState } from "react";
import ProductCarrousel from "../ProductComponents/ProductCarrousel";
import ProductPageContent from "../ProductComponents/ProductPageContent";
import { useParams } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import "../product-page.css";

function Product(prop) {
  const { addOrderDetails } = prop;

  const params = useParams();
  const productId = params.productId;

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async (productId) => {
      try {
        const response = await fetch(
          `https://la-gloria-store-algorithm-aces.vercel.app/rest/products/id/${productId}`
        );
        if (response.ok) {
          const json = await response.json();
          setProduct(json.data);
        } else {
          console.error("Error fetching product: " + response.status);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchData(productId);
  }, [productId]);

  return (
    <div className="product-page-container">
      <MDBContainer>
        <MDBRow>
          <MDBCol md="6">
            <ProductCarrousel product={product} />
          </MDBCol>
          <MDBCol md="6">
            <ProductPageContent
              product={product}
              addOrderDetails={addOrderDetails}
            />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
export default Product;
