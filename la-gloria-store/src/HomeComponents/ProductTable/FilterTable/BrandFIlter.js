import React, {useEffect, useState} from 'react';

function BrandFilter(props) {
    const {setBrandFilter} = props;
    const [brands, setBrands] = useState([]);
    const [checkboxes, setCheckBoxes] = useState({});

    const handleCheckBoxChange = (event, brandName) => {
        const { name, checked } = event.target;
        setCheckBoxes((prevCheckboxes) => ({
            ...prevCheckboxes,
            [name]: checked,
        }));

        if(checked){
            setBrandFilter(brandName);
        }
        else{
            setBrandFilter('');
        }
    }

    useEffect(() => {
        fetch('https://la-gloria-store-algorithm-aces.vercel.app/rest/brands')
            .then(response => response.json())
            .then((json) => {
                setBrands(json.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <h3>Brands:</h3>
            {brands.map(brand => (
                <div key={brand.id}>
                    <label>
                        <input
                            type="checkbox"
                            name={brand.id}
                            checked={checkboxes[brand.id] || false}
                            onChange={(event) => handleCheckBoxChange(event, brand.name)}
                        />
                        {brand.name}
                    </label>
                </div>
            ))}
        </div>
    );



}
export default BrandFilter;