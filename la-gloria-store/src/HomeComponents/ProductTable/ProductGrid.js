import React, {useState,useEffect} from 'react';
import ProductCard from './ProductCard';

function ProductGrid(props) {
    const {filter} = props
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (filter === ''){
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
            fetch(`https://la-gloria-store-algorithm-aces.vercel.app/rest/products/category/${filter}`)
                .then(response => response.json())
                .then((json) => {
                    setProducts(json.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }

    }, [filter]);



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
