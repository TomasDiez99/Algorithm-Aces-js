import React, {useEffect, useState} from "react";
import "../../../styles/home.css";
import {useNavigate} from "react-router-dom";

function BrandFilter(props) {
    const {setBrandFilter} = props;
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        fetch("https://la-gloria-store-algorithm-aces.vercel.app/rest/brands")
            .then((response) => response.json())
            .then((json) => {
                const enabledBrands = json.data.filter(
                    (brand) => brand.enable === true
                );
                setBrands(enabledBrands);
            })
            .catch(() => {
                navigate("/error");
            });
    }, []);

    const handleCheckboxChange = (event, brandName) => {
        const {checked} = event.target;

        if (checked) {
            setSelectedBrand(brandName);
            setBrandFilter(brandName);
        } else {
            setSelectedBrand("");
            setBrandFilter("");
        }
    };

    return (
        <div className="radius-component">
            <h3 className="filter-white filter-title">Brands</h3>
            {brands.map((brand) => (
                <div key={brand.id}>
                    <label>
                        <input
                            type="checkbox"
                            name={brand.id}
                            checked={selectedBrand === brand.name}
                            onChange={(event) => handleCheckboxChange(event, brand.name)}
                            className="checkbox-container"
                        />
                        <span className="filter-white">{brand.name}</span>
                    </label>
                </div>
            ))}
        </div>
    );
}

export default BrandFilter;
