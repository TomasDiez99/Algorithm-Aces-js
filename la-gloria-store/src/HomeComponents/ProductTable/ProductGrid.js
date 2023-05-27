import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

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
                    alert('There are no products for the combination of filters selected');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        let url;
        if (categoryFilter !== '' && brandFilter !== '') {
            url = `https://la-gloria-store-algorithm-aces.vercel.app/rest/products/category/${categoryFilter}/brand/${brandFilter}?page=${currentPage}`;
        } else if (categoryFilter !== '') {
            url = `https://la-gloria-store-algorithm-aces.vercel.app/rest/products/category/${categoryFilter}?page=${currentPage}`;
        } else if (brandFilter !== '') {
            url = `https://la-gloria-store-algorithm-aces.vercel.app/rest/products/brand/${brandFilter}?page=${currentPage}`;
        } else {
            url = `https://la-gloria-store-algorithm-aces.vercel.app/rest/products?page=${currentPage}`;
        }
        fetchProductsFromApi(url);
    }, [categoryFilter, brandFilter, currentPage]);

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

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
    };

    return (
        <div>
            <div style={gridStyle}>
                {products.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>
            <div>
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <button onClick={handleNextPage} disabled={currentPage === lastPage}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default ProductGrid;
