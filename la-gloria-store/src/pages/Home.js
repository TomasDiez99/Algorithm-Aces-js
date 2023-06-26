import React from 'react';
import ProductTable from '../components/HomePageComponents/ProductTable';
import HomeCarrousel from '../components/HomePageComponents/HomeCarrousel';

function Home(props) {
    const { getUpdatedStock }=props;

    return (
        <div>
            <HomeCarrousel/>
            <ProductTable getUpdatedStock={getUpdatedStock}/>
        </div>
    );
}

export default Home;
