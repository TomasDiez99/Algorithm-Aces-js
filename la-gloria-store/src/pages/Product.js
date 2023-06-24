import React, {useEffect, useState} from "react";
import ProductCarrousel from "../components/ProductPageComponents/ProductCarrousel";
import ProductPageContent from "../components/ProductPageComponents/ProductPageContent";
import {useParams} from "react-router-dom";
import {MDBContainer, MDBRow, MDBCol} from "mdbreact";
import "../styles/product-page.css";
import {useNavigate} from "react-router-dom";

function Product(prop) {
    const {orderProductPairList, handleOrderProductPairList, addOrderProductPair, getUpdatedStock} = prop;
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
                    const localProduct = json.data
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
        <div className="product-page-container">
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="6">
                        <ProductCarrousel product={product}/>
                    </MDBCol>
                    <MDBCol md="6">
                        <ProductPageContent
                            product={product}
                            orderProductPairList={orderProductPairList}
                            handleOrderProductPairList={handleOrderProductPairList}
                            addOrderProductPair={addOrderProductPair}
                            getUpdatedStock = {getUpdatedStock}
                        />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
}

export default Product;
