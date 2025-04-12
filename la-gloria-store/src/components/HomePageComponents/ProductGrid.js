import React, {useState, useEffect} from "react";
import ProductCard from "./ProductCard";
import "../../styles/home.css";
import {useNavigate} from "react-router-dom";
import {fetchMultiAttempt} from "../../utils";
import {forApi, getApiBaseUrl} from "../../urlManager";
import {toast} from 'react-toastify';

function ProductGrid(props) {
    const {categoryFilter, brandFilter, currentPage, setCurrentPage} = props;
    const [lastPage, setLastPage] = useState(1);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [blockNextPrev, setBlockNextPrev] = useState(false);


    useEffect(() => {
        let url = getUrlEndpoint();

        console.log("useEffect called in product grid with currentPage:", currentPage);

        const fetchProductsFromApi = async (url) => {
            try {

                const response = await fetchMultiAttempt({url});
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

                    console.log("entered else if currentPage !== 1 with page ", currentPage);
                    setCurrentPage(1);
                } else {
                    toast.error("There are no products for the combination of filters selected");
                }
            } catch (error) {
                //toast.error("Please go online to view the products available for the selected brands and categories.");
                //console.error("Error fetching products: ", error);
                navigate("/errorPWA");
            } finally {
                setBlockNextPrev(false); // Reactivar botones despues de fetchear
            }
        };

        fetchProductsFromApi(url);
    }, [categoryFilter, brandFilter, currentPage]);

    const goToPage = (page) => {
        if (page >= 1 && page <= lastPage && !blockNextPrev) {
            setBlockNextPrev(true);
            setCurrentPage(page);
            console.log("goToPage called with page:", page);
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
                        />
                    </div>
                ))}
            </div>
            <div className="container-fluid paginateButtonStyle radius-component">
                <button
                    className="btn change-page-button"
                    onClick={() => {
                        goToPage(currentPage - 1);
                    }}
                    disabled={currentPage === 1 || blockNextPrev}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Previous Page"
                    aria-label="Previous Page button"
                >
                    Previous
                </button>
                <button
                    className="btn change-page-button"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === lastPage || blockNextPrev}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Next Page"
                    aria-label="Next Page button"
                >
                    Next
                </button>
            </div>
        </div>
    );

    function getUrlEndpoint() {
        let url = getApiBaseUrl()
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
        return res;
    }
}

export default ProductGrid;
