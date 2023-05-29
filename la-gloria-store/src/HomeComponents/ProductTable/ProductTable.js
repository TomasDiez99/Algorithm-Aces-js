import React, { useState } from 'react';
import FilterTable from './FilterTable/FilterTable';
import ProductGrid from './ProductGrid';

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
        <div style={{ display: 'flex', marginRight: '15px' }}>
            <div style={{ flex: 1, marginRight: '4px' }}>
                <FilterTable
                    setCategoryFilter={categoryFilterHandle}
                    setBrandFilter={brandFilterHandle}
                />
            </div>
            <div style={{ flex: 4, marginLeft: '4px' }}>
                <ProductGrid categoryFilter={categoryFilter} brandFilter={brandFilter} />
            </div>
        </div>
    );
}

export default ProductTable;
