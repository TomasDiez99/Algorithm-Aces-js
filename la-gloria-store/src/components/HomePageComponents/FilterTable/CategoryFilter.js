import React, { useEffect, useState } from "react";
import "../../../styles/home.css";
import { fetchMultiAttempt, handleErrorResponse } from "../../../utils";
import { forApi } from "../../../urlManager";

/**
 * Fetch categories data from the API and update the categories state.
 *
 * @param {string} url - The API URL to fetch categories from.
 * @param {Function} setCategories - Function to update the categories state.
 */
async function fetchCategoriesData(url, setCategories) {
    try {
        const response = await fetchMultiAttempt({ url });

        if (!response.ok) {
            await handleErrorResponse(response);
            return;
        }

        const json = await response.json();
        const enabledCategories = json.data.filter(category => category.enable);
        setCategories(enabledCategories);
    } catch (error) {
        console.error("Error fetching categories:", error.message);
    }
}

/**
 * Generate a handler function for checkbox change events.
 *
 * @param {Function} setSelectedCategory - Function to update the selected category state.
 * @param {Function} setCategoryFilter - Function to update the category filter state.
 * @returns {Function} - The handler function for checkbox change events.
 */
const createCheckboxChangeHandler = (setSelectedCategory, setCategoryFilter) => (event, categoryName) => {
    const { checked } = event.target;
    if (checked) {
        setSelectedCategory(categoryName);
        setCategoryFilter(categoryName);
    } else {
        setSelectedCategory("");
        setCategoryFilter("");
    }
};

function CategoryFilter({ setCategoryFilter }) {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const url = forApi("categories");

    useEffect(() => {
        fetchCategoriesData(url, setCategories);
    }, [url]);

    const handleCheckboxChange = createCheckboxChangeHandler(setSelectedCategory, setCategoryFilter);

    return (
        <div>
            <h3 className="filter-white filter-title">Categories</h3>
            {categories.map(category => (
                <div key={category.id}>
                    <label>
                        <input
                            type="checkbox"
                            name={category.id}
                            checked={selectedCategory === category.name}
                            onChange={(event) => handleCheckboxChange(event, category.name)}
                            className="checkbox-container"
                        />
                        <span
                            className={`filter-white ${
                                selectedCategory === category.name ? "selected radius-component container-fluid" : ""
                            }`}
                        >
                            {category.name}
                        </span>
                    </label>
                </div>
            ))}
        </div>
    );
}

export default CategoryFilter;
