import React from 'react';
import CategoryFilter from "./CategoryFilter";
import BrandFilter from "./BrandFIlter";

function FilterTable() {
    return (
        <div>
            <div style={{ borderBottom: '1px solid black' }}>
                <CategoryFilter/>
            </div>
            <div>
                <BrandFilter/>
            </div>
        </div>
    );
}

export default FilterTable;
