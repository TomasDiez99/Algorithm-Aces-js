import React, {useState,useEffect} from 'react';
import ProductCard from './ProductCard';

function ProductGrid() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://la-gloria-store-algorithm-aces.vercel.app/rest/products')
            .then(response => response.json())
            .then((json) => {
                setProducts(json.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

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
