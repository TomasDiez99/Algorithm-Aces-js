import React, {useState} from 'react';
import FilterTable from './FilterTable/FilterTable';
import ProductGrid from './ProductGrid';
import "../../styles/home.css";

function ProductTable() {
    const [categoryFilter, setCategoryFilter] = useState('');
    const [brandFilter, setBrandFilter] = useState('');

    const categoryFilterHandle = (category) => {
        setCategoryFilter(category);
    };
    const brandFilterHandle = (brand) => {
        setBrandFilter(brand);
    };

    return (
        <div className="home-container">
            <div className="filter">
                <FilterTable
                    setCategoryFilter={categoryFilterHandle}
                    setBrandFilter={brandFilterHandle}
                />
            </div>
            <div className="grid">
                <ProductGrid categoryFilter={categoryFilter} brandFilter={brandFilter}/>
            </div>
        </div>
    );

}

export default ProductTable;
