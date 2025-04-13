import React, {useEffect} from 'react';
import ProductTable from '../components/HomePageComponents/ProductTable';
import HomeCarrousel from '../components/HomePageComponents/HomeCarrousel';
import NewsletterSection from '../components/HomePageComponents/NewsletterSection';
import ActionBar from '../components/ActionBar';


function Home(props) {

    const {currentPage, setCurrentPage, initialPage} = props;


    useEffect(() => {
        document.title = (currentPage === initialPage) ? "Home" : `Page ${currentPage}`;

        //push the current page to history with react
        window.history.pushState({page: currentPage}, `Page ${currentPage}`, `/?page=${currentPage}`);
    }, [currentPage]);

    return (
        <div>
            {/* <ActionBar/> */}
            <div style={{height: "60px"}}/>
            <HomeCarrousel/>
            <ProductTable
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <NewsletterSection/>
        </div>
    );
}

export default Home;
