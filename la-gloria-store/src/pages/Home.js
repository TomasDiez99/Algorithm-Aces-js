import React from 'react';
import ProductTable from '../components/HomePageComponents/ProductTable';
import '../App.css';


function Home(props) {
    const { getUpdatedStock }=props;

    return (
        <div>
            <ProductTable getUpdatedStock={getUpdatedStock}/>
        </div>
    );
}

export default Home;
