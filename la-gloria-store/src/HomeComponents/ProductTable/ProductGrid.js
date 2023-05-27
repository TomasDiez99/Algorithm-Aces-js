import React, {useState, useEffect} from 'react';
import ProductCard from './ProductCard';

function ProductGrid(props) {
    const {categoryFilter, brandFilter} = props
    const [products, setProducts] = useState([]);

    const getProductsFromApi = (url) => {
        fetch(url)
            .then(response => response.json())
            .then((json) => {
                if (json.data.length !== 0) {
                    setProducts(json.data);
                } else {
                    alert('There are not products for the combination of filters selected');
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        let url;
        if (categoryFilter !== '' && brandFilter !== '') {
            url = `https://la-gloria-store-algorithm-aces.vercel.app/rest/products/category/${categoryFilter}/brand/${brandFilter}`;
        } else if (categoryFilter !== '') {
            url = `https://la-gloria-store-algorithm-aces.vercel.app/rest/products/category/${categoryFilter}`;
        } else if (brandFilter !== '') {
            url = `https://la-gloria-store-algorithm-aces.vercel.app/rest/products/brand/${brandFilter}`;
        } else {
            url = 'https://la-gloria-store-algorithm-aces.vercel.app/rest/products';
        }
        getProductsFromApi(url);
    }, [categoryFilter, brandFilter]);

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
