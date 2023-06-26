import React from "react";
import CategoryFilter from "./CategoryFilter";
import BrandFilter from "./BrandFIlter";
import "../../../styles/home.css";

function FilterTable(props) {
    const {setCategoryFilter, setBrandFilter} = props;
    return (
        <div className="filter-table radius-component">
            <div>
                <CategoryFilter setCategoryFilter={setCategoryFilter}/>
            </div>
            <div>
                <BrandFilter setBrandFilter={setBrandFilter}/>
            </div>
        </div>
    );
}

export default FilterTable;
