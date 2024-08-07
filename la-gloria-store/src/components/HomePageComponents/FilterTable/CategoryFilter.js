import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/home.css";

function CategoryFilter(props) {
  const { setCategoryFilter } = props;
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();
  const url = "https://algorithm-aces-staging.vercel.app/rest/categories";

  useEffect(() => {
    async function fetchData() {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("User-Agent", "PostmanRuntime/7.40.0"); //TODO: Se podría sacar el useragent de postman?
      try {
        let fetchResult = { ok: false };
        try {
          fetchResult = await fetch(url, {
            method: "GET",
            headers: new Headers({
              "Content-Type": "application/json",
              "User-Agent": "PostmanRuntime/7.40.0",
              "Access-Control-Allow-Origin": "*",
            }),
          });

          if (!fetchResult.ok) {
            throw new Error(`HTTP error with status: ${fetchResult.status}`);
          } 

        } catch (e) {
          console.error("Error: ", e.message);
        }

        let json = await fetchResult.json();
        const enabledCategories = json.data.filter(
          (category) => category.enable === true
        );

        setCategories(enabledCategories);
      } catch (e) {
        console.error("Error: ", e.message);
        //navigate("/error");
      }
    }
    fetchData();
  }, []);

  const handleCheckboxChange = (event, categoryName) => {
    const { checked } = event.target;

    if (checked) {
      setSelectedCategory(categoryName);
      setCategoryFilter(categoryName);
    } else {
      setSelectedCategory("");
      setCategoryFilter("");
    }
  };

  return (
    <div>
      <h3 className="filter-white filter-title">Categories</h3>
      {categories.map((category) => (
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
                selectedCategory === category.name
                  ? "selected radius-component container-fluid"
                  : ""
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
