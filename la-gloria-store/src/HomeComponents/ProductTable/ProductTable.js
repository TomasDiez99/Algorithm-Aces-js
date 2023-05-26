import React, {useState} from 'react';
import FilterTable from "./FilterTable/FilterTable";
import ProductGrid from "./ProductGrid";
function ProductTable() {
    const[categoryFilter,setCategoryFilter] = useState('');
    const[brandFilter,setBrandFilter] = useState('');

    const categoryFilterHandle = (category) => {
        setCategoryFilter(category)
    }
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, borderRight: '1px solid black' }}>
                <FilterTable setCategoryFilter = {categoryFilterHandle} />
            </div>
            <div style={{ flex: 4 }}>
                <ProductGrid filter = { categoryFilter }/>
            </div>
        </div>
    );

}

export default ProductTable;
