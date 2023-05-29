import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

function ProductGrid(props) {
  const { categoryFilter, brandFilter } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [products, setProducts] = useState([]);

  const fetchProductsFromApi = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        if (json.data.length !== 0) {
          setProducts(json.data);
          setLastPage(json.meta.last_page);
        } else {
          alert(
            "There are no products for the combination of filters selected"
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
  /*
    const handleNextPage = () => {
        if (currentPage < lastPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
*/

  const goToPage = (page) => {
    if (page >= 1 && page <= lastPage) {
      setCurrentPage(page);
    }
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 20px",
  };

  const cardContainerStyle = {
    marginLeft: "35px",
    marginRight: "30px",
  };

  return (
    <div className="page-backgroud-color" style={{ borderRadius: "10px" }}>
      <div className="grid-margin" style={gridStyle}>
        {products.map((product) => (
          <div style={cardContainerStyle} key={product.id}>
            <ProductCard {...product} />
          </div>
        ))}
      </div>
      <div
        style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}
      >
        <button
          className="btn btn-red"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="btn btn-red"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === lastPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ProductGrid;
