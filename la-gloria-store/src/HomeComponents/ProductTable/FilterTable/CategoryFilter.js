import React, {useEffect, useState} from 'react';

function CategoryFilter(props) {
    const {setCategoryFilter} = props;
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        fetch('https://la-gloria-store-algorithm-aces.vercel.app/rest/categories')
            .then(response => response.json())
            .then((json) => {
                setCategories(json.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleCheckboxChange = (event, categoryName) => {
        const {checked} = event.target;

        if (checked) {
            setSelectedCategory(categoryName);
            setCategoryFilter(categoryName);
        } else {
            setSelectedCategory('');
            setCategoryFilter('');
        }
    };

    return (
        <div>
            <h3 className= "filter-white">Categories:</h3>
            {categories.map((category) => (
                <div key={category.id}>
                    <label>
                        <input
                            type="checkbox"
                            name={category.id}
                            checked={selectedCategory === category.name}
                            onChange={(event) => handleCheckboxChange(event, category.name)}
                        />
                        <span className="filter-white">{category.name}</span>
                    </label>
                </div>
            ))}
        </div>
    );
}

export default CategoryFilter;
