import React, { useEffect, useState } from 'react';

function BrandFilter(props) {
    const { setBrandFilter } = props;
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');

    const handleCheckboxChange = (event, brandName) => {
        const { checked } = event.target;

        if (checked) {
            setSelectedBrand(brandName);
            setBrandFilter(brandName);
        } else {
            setSelectedBrand('');
            setBrandFilter('');
        }
    };

    useEffect(() => {
        fetch('https://la-gloria-store-algorithm-aces.vercel.app/rest/brands')
            .then((response) => response.json())
            .then((json) => {
                setBrands(json.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <h3>Brands:</h3>
            {brands.map((brand) => (
                <div key={brand.id}>
                    <label>
                        <input
                            type="checkbox"
                            name={brand.id}
                            checked={selectedBrand === brand.name}
                            onChange={(event) => handleCheckboxChange(event, brand.name)}
                        />
                        {brand.name}
                    </label>
                </div>
            ))}
        </div>
    );
}

export default BrandFilter;