import React from 'react';
import ProductTable from '../components/HomePageComponents/ProductTable';
import HomeCarrousel from '../components/HomePageComponents/HomeCarrousel';
import NewsletterSection from '../components/HomePageComponents/NewsletterSection';


function Home(props) {
    const { getUpdatedStock }=props;

    return (
        <div
        >
            <HomeCarrousel/>
            <ProductTable getUpdatedStock={getUpdatedStock}/>
            <NewsletterSection/>
        </div>
    );
}

export default Home;
