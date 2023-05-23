import React from 'react';
import ProductTable from '../HomeComponents/ProductTable/ProductTable';
import '../App.css';
import Carousel from "../HomeComponents/Carousel";


function Home() {

    return (
        <div>
            <Carousel/>
            <ProductTable/>
        </div>
    );
}

export default Home;
