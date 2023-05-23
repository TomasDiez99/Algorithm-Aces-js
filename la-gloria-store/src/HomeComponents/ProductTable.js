import React from 'react';
import FilterTable from "./FilterTable";
import ProductGrid from "./ProductGrid";
function ProductTable() {
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, borderRight: '1px solid black' }}>
                <FilterTable/>
            </div>
            <div style={{ flex: 4 }}>
                <ProductGrid/>
            </div>
        </div>
    );
}

export default ProductTable;
