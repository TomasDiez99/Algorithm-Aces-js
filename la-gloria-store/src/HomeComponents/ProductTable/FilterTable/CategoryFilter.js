import React, {useEffect, useState} from 'react';

function CategoryFilter() {
    const [categories, setCategories] = useState([]);
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
            {categories.map(category => (
                <div key={category.id}>
                    <label>
                        <input type="checkbox" value={category.name} />
                        {category.name}
                    </label>
                </div>
            ))}
        </div>
    );



}
export default CategoryFilter;