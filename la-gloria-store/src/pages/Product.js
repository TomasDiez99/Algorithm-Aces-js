"use client"

import {useEffect, useState} from "react"
import ProductCarrousel from "../components/ProductPageComponents/ProductCarrousel"
import ProductPageContent from "../components/ProductPageComponents/ProductPageContent"
import {useParams} from "react-router-dom"
import "../styles/product-page.css"
import {useNavigate} from "react-router-dom"

function Product(props) {
    const {currentPage, setCurrentPage, initialPage} = props;
    const [product, setProduct] = useState(null);

    const params = useParams()
    const productId = params.productId
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async (productId) => {
            try {
                const response = await fetch(`https://algorithm-aces.vercel.app/rest/products/id/${productId}`)
                if (response.ok) {
                    const json = await response.json()
                    setProduct(json.data)
                    const localProduct = json.data
                    document.title = localProduct.name
                    checkProductUnavailable(localProduct)
                } else {
                    // console.log("Error fetching product data and entering fetch else:", response.status);
                    // if (currentPage !== initialPage) {
                    //     setCurrentPage(initialPage)
                    // }
                    navigate("/error", {replace: true});
                }
            } catch (error) {
                // if (currentPage !== initialPage) {
                //     setCurrentPage(initialPage);
                // }
                navigate("/error", {replace: true});
            }
        }

        fetchData(productId)
    }, [productId])

    const checkProductUnavailable = (product) => {
        if (product.enable === false) {
            navigate("/error")
        }
    }

    return (
        <div className="product-page-container">
            <div className="product-layout">
                <div className="product-image-container">
                    <ProductCarrousel product={product}/>
                </div>
                <div className="product-details-container">
                    <ProductPageContent product={product}/>
                </div>
            </div>
        </div>
    )
}

export default Product

