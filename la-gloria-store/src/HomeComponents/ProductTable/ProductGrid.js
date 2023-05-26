import React, {useState,useEffect} from 'react';
import ProductCard from './ProductCard';

function ProductGrid(props) {
    const {categoryFilter, brandFilter} = props
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (categoryFilter === ''){
            fetch('https://la-gloria-store-algorithm-aces.vercel.app/rest/products')
                .then(response => response.json())
                .then((json) => {
                    setProducts(json.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
        else{
            fetch(`https://la-gloria-store-algorithm-aces.vercel.app/rest/products/category/${categoryFilter}`)
                .then(response => response.json())
                .then((json) => {
                    setProducts(json.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }

    }, [categoryFilter]);

    useEffect(() => {
        if (brandFilter === ''){
            fetch('https://la-gloria-store-algorithm-aces.vercel.app/rest/products')
                .then(response => response.json())
                .then((json) => {
                    setProducts(json.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
        else{
            fetch(`https://la-gloria-store-algorithm-aces.vercel.app/rest/products/brand/${brandFilter}`)
                .then(response => response.json())
                .then((json) => {
                    setProducts(json.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }

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
