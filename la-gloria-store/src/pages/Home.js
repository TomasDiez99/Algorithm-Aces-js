import React from 'react';
import ProductTable from '../components/HomePageComponents/ProductTable';
import HomeCarrousel from '../components/HomePageComponents/HomeCarrousel';
import NewsletterSection from '../components/HomePageComponents/NewsletterSection';
import ActionBar from '../components/ActionBar';


function Home() {

    return (
        <div>
            {/* <ActionBar/> */}
            <div style={{ height: "60px" }} /> 
            <HomeCarrousel/>
            <ProductTable/>
            <NewsletterSection/>
        </div>
    );
}

export default Home;
