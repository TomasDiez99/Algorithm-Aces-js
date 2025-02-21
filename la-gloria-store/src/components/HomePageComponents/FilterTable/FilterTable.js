import React from "react";
import CategoryFilter from "./CategoryFilter";
import BrandFilter from "./BrandFIlter";
import "../../../styles/home.css";

function FilterTable(props) {
    const {setCategoryFilter, 
        setBrandFilter, 
        selectedCategory, 
        setSelectedCategory,
        selectedBrand, 
        setSelectedBrand} = props;

    return (
        <div className="filter-table radius-component">
            <div>
                <CategoryFilter 
                    setCategoryFilter={setCategoryFilter}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
            </div>
            <div>
                <BrandFilter 
                    setBrandFilter={setBrandFilter}
                    selectedBrand={selectedBrand}
                    setSelectedBrand={setSelectedBrand}
                />
            </div>
        </div>
    );
}

export default FilterTable;
