import React, {useState, useEffect} from "react";
import ProductCard from "./ProductCard";
import "../../styles/home.css";
import {useNavigate} from "react-router-dom";
import {performGet} from "../../utils";
import {forApi} from "../../urlManager";

function ProductGrid(props) {
    const {categoryFilter, brandFilter, getUpdatedStock} = props;
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let url = getUrlEndpoint();

        const fetchProductsFromApi = async (url) => {
            try {


                const response = await performGet({url});
                if (!response.ok) {

                    const text = await response.text();
                    const blob = new Blob([text], {type: 'text/html'});
                    const newWindow = window.open(URL.createObjectURL(blob), '_blank');
                    newWindow.focus();
                }

                const json = await response.json();
                if (json.data && json.data.length > 0) {
                    setProducts(json.data);
                    setLastPage(json.meta.last_page);
                } else if (currentPage !== 1) {
                    setCurrentPage(1);
                } else {
                    alert("There are no products for the combination of filters selected");
                }
            } catch (error) {
                console.error("Error fetching products: ", error);
                //navigate("/error");
            }
        };

        fetchProductsFromApi(url);
    }, [categoryFilter, brandFilter, currentPage]);

    const goToPage = (page) => {
        if (page >= 1 && page <= lastPage) {
            setCurrentPage(page);
        }
    };

    return (
        <div>
            <div className="productGridStyle">
                {products.map((product) => (
                    <div className="cardContainerStyle" key={product.id}>
                        <ProductCard
                            id={product.id}
                            name={product.name}
                            image={product.image}
                            price={product.price}
                            enable={product.enable}
                            stock={product.stock}
                            getUpdatedStock={getUpdatedStock}
                        />
                    </div>
                ))}
            </div>
            <div className="container-fluid paginateButtonStyle radius-component">
                <button
                    className="btn change-page-button"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Previous Page"
                >
                    Previous
                </button>
                <button
                    className="btn change-page-button"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === lastPage}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Next Page"
                >
                    Next
                </button>
            </div>
        </div>
    );

    function getUrlEndpoint() {
        let url = forApi("")
        let res;
        if (categoryFilter !== "" && brandFilter !== "") {
            res =
                url +
                `/products/category/${categoryFilter}/brand/${brandFilter}?page=${currentPage}`;
        } else if (categoryFilter !== "") {
            res = url + `/products/category/${categoryFilter}?page=${currentPage}`;
        } else if (brandFilter !== "") {
            res = url + `/products/brand/${brandFilter}?page=${currentPage}`;
        } else {
            res = url + `/products?page=${currentPage}`;
        }
        console.log(res);
        return res;
    }
}

export default ProductGrid;
