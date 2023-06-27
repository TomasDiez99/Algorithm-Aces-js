import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/home.css";

function CategoryFilter(props) {
  const { setCategoryFilter } = props;
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://la-gloria-store-algorithm-aces.vercel.app/rest/categories")
      .then((response) => response.json())
      .then((json) => {
        const enabledCategories = json.data.filter(
          (category) => category.enable === true
        );
        setCategories(enabledCategories);
      })
      .catch(() => {
        navigate("/error");
      });
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
