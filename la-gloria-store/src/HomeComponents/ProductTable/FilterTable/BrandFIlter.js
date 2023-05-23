import React, {useEffect, useState} from 'react';

function BrandFilter() {
    const [brands, setBrands] = useState([]);
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
                        <input type="checkbox" value={brand.name} />
                        {brand.name}
                    </label>
                </div>
            ))}
        </div>
    );



}
export default BrandFilter;