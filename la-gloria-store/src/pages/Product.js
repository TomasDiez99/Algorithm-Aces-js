import "../App.css";
import React, { useEffect, useState } from "react";
import ProductCarrousel from "../ProductComponents/ProductCarrousel";
import ProductPageContent from "../ProductComponents/ProductPageContent";
import {useParams} from "react-router-dom";

function Product (prop){
    const { addOrderDetails } = prop;

    const params = useParams();
    const productId = params.productId;

    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchData = async (productId) => {
            try {
                const response = await fetch(`https://la-gloria-store-algorithm-aces.vercel.app/rest/products/id/${productId}`);
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
      <div style={{ display: 'flex', marginRight: '15px' }}>
        <div style={{ flex: 1, marginRight: '4px' }}>
          <ProductCarrousel product = {product}/>
        </div>
        <div style={{ flex: 4, marginLeft: '4px' }}>
            <ProductPageContent product = {product} addOrderDetails = {addOrderDetails}/>
        </div>
      </div>

  );
}
export default Product;