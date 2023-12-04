import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

function ProductGrid(props) {
  const { categoryFilter, brandFilter, getUpdatedStock } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let url;
    if (categoryFilter !== "" && brandFilter !== "") {
      url = `https://la-gloria-store-algorithm-aces.vercel.app/rest/products/category/${categoryFilter}/brand/${brandFilter}?page=${currentPage}`;
    } else if (categoryFilter !== "") {
      url = `https://la-gloria-store-algorithm-aces.vercel.app/rest/products/category/${categoryFilter}?page=${currentPage}`;
    } else if (brandFilter !== "") {
      url = `https://la-gloria-store-algorithm-aces.vercel.app/rest/products/brand/${brandFilter}?page=${currentPage}`;
    } else {
      url = `https://la-gloria-store-algorithm-aces.vercel.app/rest/products?page=${currentPage}`;
    }
    fetchProductsFromApi(url);
  }, [categoryFilter, brandFilter, currentPage]);

  const fetchProductsFromApi = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        if (json.data.length !== 0) {
          setProducts(json.data);
          setLastPage(json.meta.last_page);
        } else if (currentPage !== 1) {
          setCurrentPage(1);
        } else {
          alert(
            "There are no products for the combination of filters selected"
          );
        }
      })
      .catch(() => {
        navigate("/error");
      });
  };

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
}

export default ProductGrid;
