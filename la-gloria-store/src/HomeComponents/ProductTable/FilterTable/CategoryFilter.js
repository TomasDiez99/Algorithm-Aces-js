import React, {useEffect, useState} from 'react';

function CategoryFilter(props) {
    const {setCategoryFilter} = props;
    const [categories, setCategories] = useState([]);



    const [checkboxes, setCheckboxes] = useState({});

    const handleCheckboxChange = (event,categoryName) => {
        const { name, checked } = event.target;
        setCheckboxes((prevCheckboxes) => ({
            ...prevCheckboxes,
            [name]: checked,
        }));

        if(checked){
            setCategoryFilter(categoryName);
        }
        else{
            setCategoryFilter('');
        }
    };

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

    return (
        <div>
            <h3>Categories:</h3>
            {categories.map((category) => (
                <div key={category.id}>
                    <label>
                        <input
                            type="checkbox"
                            name={category.id}
                            checked={checkboxes[category.id] || false}
                            onChange={(event) => handleCheckboxChange(event, category.name)}
                        />
                        {category.name}
                    </label>
                </div>
            ))}
        </div>
    );



}
export default CategoryFilter;