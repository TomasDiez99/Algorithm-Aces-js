import React, { useEffect, useState } from "react";
import "../../../styles/home.css";
import { useNavigate } from "react-router-dom";
import {performGet} from "../../../utils";
import {forApi} from "../../../urlManager";

function BrandFilter(props) {
  const { setBrandFilter } = props;
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");

  const url = forApi("brands");

  useEffect(() => {
    async function fetchData() {
      try {
        const requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        let fetchResult = await performGet({url});

        if (!fetchResult.ok) {

          const text = await fetchResult.text();
          const blob = new Blob([text], {type: 'text/html'});
          const newWindow = window.open(URL.createObjectURL(blob), '_blank');
          newWindow.focus();
        }

        let json = await fetchResult.json();
        const enabledBrands = json.data.filter(
          (brand) => brand.enable === true
        );
        setBrands(enabledBrands);
      } catch (e) {
        console.error("Error: ", e.message);

      }
    }

    fetchData();
  }, []);

  const handleCheckboxChange = (event, brandName) => {
    const { checked } = event.target;

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
            <span
              className={`filter-white ${
                selectedBrand === brand.name
                  ? "selected radius-component container-fluid"
                  : ""
              }`}
            >
              {brand.name}
            </span>
          </label>
        </div>
      ))}
    </div>
  );
}

export default BrandFilter;
