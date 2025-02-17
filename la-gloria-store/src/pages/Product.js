import React, { useEffect, useState } from "react";
import ProductCarrousel from "../components/ProductPageComponents/ProductCarrousel";
import ProductPageContent from "../components/ProductPageComponents/ProductPageContent";
import VerticalBanner from "../components/ProductPageComponents/VerticalBanner";
import { useParams } from "react-router-dom";
import "../styles/product-page.css";
import { useNavigate } from "react-router-dom";

function Product() {
  const [product, setProduct] = useState(null);

  const params = useParams();
  const productId = params.productId;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async (productId) => {
      try {
        const response = await fetch(
          `https://la-gloria-store-algorithm-aces.vercel.app/rest/products/id/${productId}`
        );
        if (response.ok) {
          const json = await response.json();
          setProduct(json.data);
          const localProduct = json.data;
          checkProductUnavailable(localProduct);
        } else {
          navigate("/error");
        }
      } catch (error) {
        navigate("/error");
      }
    };

    fetchData(productId);
  }, [productId]);

  const checkProductUnavailable = (product) => {
    if (product.stock === 0 || product.enable === false) {
      navigate("/error");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="flex flex-col lg:flex-row justify-center w-full lg:w-10/12">
        <div className="w-full lg:w-5/12 mb-4 lg:mb-0 mt-4">
          <ProductCarrousel product={product} />
        </div>
        <div className="w-full lg:w-5/12 mt-4">
          <ProductPageContent product={product} />
        </div>
        
      </div>
    </div>
  );

}

export default Product;
