import React, {useState, useEffect} from 'react';
import ProductCard from './ProductCard';

function ProductGrid(props) {
    const {categoryFilter, brandFilter} = props
    const [products, setProducts] = useState([]);

    const getProductsFromApi = (url) => {
        fetch(url)
            .then(response => response.json())
            .then((json) => {
                setProducts(json.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        let url;
        if (categoryFilter === '') {
            url = 'https://la-gloria-store-algorithm-aces.vercel.app/rest/products';
        } else {
            url = `https://la-gloria-store-algorithm-aces.vercel.app/rest/products/category/${categoryFilter}`;
        }
        getProductsFromApi(url);
    }, [categoryFilter]);

    useEffect(() => {
        let url;
        if (brandFilter === '') {
            url = 'https://la-gloria-store-algorithm-aces.vercel.app/rest/products';
        } else {
            url = `https://la-gloria-store-algorithm-aces.vercel.app/rest/products/brand/${brandFilter}`;
        }
        getProductsFromApi(url);
    }, [brandFilter]);


    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
    };

    return (
        <div style={gridStyle}>
            {products.map(product => (
                <ProductCard key={product.id} {...product} />
            ))}
        </div>
    );

}

export default ProductGrid;
