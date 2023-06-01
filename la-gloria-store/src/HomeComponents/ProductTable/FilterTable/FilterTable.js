import React from "react";
import CategoryFilter from "./CategoryFilter";
import BrandFilter from "./BrandFIlter";
import "../../home.css";

function FilterTable(props) {
  const { setCategoryFilter, setBrandFilter } = props;
  return (
    <div className="radius-component filter-black">
      <div className="filter-black">
        <CategoryFilter setCategoryFilter={setCategoryFilter} />
      </div>
      <div>
        <BrandFilter setBrandFilter={setBrandFilter} />
      </div>
    </div>
  );
}

export default FilterTable;
