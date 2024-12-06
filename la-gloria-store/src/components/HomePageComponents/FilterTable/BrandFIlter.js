import React, {useEffect, useState} from "react";
import "../../../styles/home.css";
import {handleErrorResponse, fetchMultiAttempt} from "../../../utils";
import {forApi} from "../../../urlManager";

/**
 * Fetch brands from the API.
 *
 * @param {string} url - The URL to fetch data from.
 * @param {Function} setBrands - Function to update the brands state.
 */
const fetchBrands = async (url, setBrands) => {
    try {

        const response = await fetchMultiAttempt({url});

        if (response.ok) {
            const data = await response.json();
            const enabledBrands = data.data.filter(brand => brand.enable);
            setBrands(enabledBrands);
            return;
        }

        await handleErrorResponse(response);

    } catch (error) {
        console.error("Error fetching brands:", error.message);
    }
};


/**
 * Component to render a single checkbox for a brand.
 */
const BrandCheckbox = ({brand, isSelected, onChange}) => (
    <div>
        <label>
            <input
                type="checkbox"
                name={brand.id}
                checked={isSelected}
                onChange={(event) => onChange(event, brand.name)}
                className="checkbox-container"
            />
            <span
                className={`filter-white ${
                    isSelected ? "selected radius-component container-fluid" : ""
                }`}
            >
        {brand.name}
      </span>
        </label>
    </div>
);

function BrandFilter({setBrandFilter}) {
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState("");

    const url = forApi("brands");

    useEffect(() => {
        fetchBrands(url, setBrands);
    }, [url]);

    const handleCheckboxChange = (event, brandName) => {
        const {checked} = event.target;
        setSelectedBrand(checked ? brandName : "");
        setBrandFilter(checked ? brandName : "");
    };

    return (
        <div className="radius-component">
            <h3 className="filter-white filter-title">Brands</h3>
            {brands.map((brand) => (
                <BrandCheckbox
                    key={brand.id}
                    brand={brand}
                    isSelected={selectedBrand === brand.name}
                    onChange={handleCheckboxChange}
                />
            ))}
        </div>
    );
}

export default BrandFilter;
