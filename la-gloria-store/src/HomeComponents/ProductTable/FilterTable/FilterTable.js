import React from 'react';
import CategoryFilter from "./CategoryFilter";
import BrandFilter from "./BrandFIlter";

function FilterTable(props) {
   const  {setCategoryFilter,setBrandFilter } = props;
    return (
        <div>
            <div style={{ borderBottom: '1px solid black' }}>
                <CategoryFilter setCategoryFilter = {setCategoryFilter} />
            </div>
            <div>
                <BrandFilter setBrandFilter = {setBrandFilter} />
            </div>
        </div>
    );
}

export default FilterTable;
