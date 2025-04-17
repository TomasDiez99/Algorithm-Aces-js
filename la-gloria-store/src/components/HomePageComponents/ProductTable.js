"use client"

import {useState} from "react"
import ProductGrid from "./ProductGrid"
import "../../styles/home.css"
import ActionBar from "../../components/ActionBar"

function ProductTable(props) {

    const {currentPage, setCurrentPage} = props;
    const [categoryFilter, setCategoryFilter] = useState("");
    const [brandFilter, setBrandFilter] = useState("");

    const categoryFilterHandle = (category) => {
        setCategoryFilter(category)
    }
    const brandFilterHandle = (brand) => {
        setBrandFilter(brand)
    }

    return (
        <div className="home-container">
            <div className="w-100">
                <ActionBar setCategoryFilter={categoryFilterHandle} setBrandFilter={brandFilterHandle}/>
            </div>
            <div className="grid radius-component w-100">
                <ProductGrid
                    categoryFilter={categoryFilter}
                    brandFilter={brandFilter}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    )
}

export default ProductTable
