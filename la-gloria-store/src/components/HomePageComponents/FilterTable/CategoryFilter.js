import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import "../../../styles/home.css";
import {performGet} from "../../../utils";
import {forApi} from "../../../urlManager";

function CategoryFilter(props) {
    const {setCategoryFilter} = props;
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const navigate = useNavigate();
    const url = forApi("categories")

    useEffect(() => {
        async function fetchData() {
            try {
                let fetchResult = {ok: false};
                try {
                    fetchResult = await performGet({url});
                } catch (e) {
                    console.log(
                        e.name +
                        " ... si, falla el fetch  " +
                        e.message +
                        " stack: " +
                        e.stack
                    );
                }

                if (!fetchResult.ok) {

                    const text = await fetchResult.text();
                    const blob = new Blob([text], {type: 'text/html'});
                    const newWindow = window.open(URL.createObjectURL(blob), '_blank');
                    newWindow.focus();
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
        const {checked} = event.target;

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
