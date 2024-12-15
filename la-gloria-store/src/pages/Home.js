import React from 'react';
import ProductTable from '../components/HomePageComponents/ProductTable';
import HomeCarrousel from '../components/HomePageComponents/HomeCarrousel';
import NewsletterSection from '../components/HomePageComponents/NewsletterSection';


function Home() {

    return (
        <div
        >
            <HomeCarrousel/>
            <ProductTable/>
            <NewsletterSection/>
        </div>
    );
}

export default Home;
