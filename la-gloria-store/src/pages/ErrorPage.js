import React, {useEffect} from 'react';
import {useNavigate, useLocation, Link} from 'react-router-dom';
import '../styles/errorPage.css';

const ErrorPage = (props) => {
    const {currentPage, setCurrentPage, initialPage} = props;
    const navigate = useNavigate();
    const location = useLocation();

    function resetCurrentPage() {
        console.log("Entered resetCurrentPage with currentPage:", currentPage);
        if (currentPage !== initialPage) {
            setCurrentPage(initialPage);
        }
        console.log("Current page after resetCurrentPage:", currentPage);
    }

    function moveToSafeCachedCurrentPage() {
        console.log("Entered moveToSafeCachedCurrentPage with currentPage:", currentPage);
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else {
            setCurrentPage(initialPage); // initialPage should be 1
        }
        console.log("Current page after moveToSafeCachedCurrentPage:", currentPage);
    }

    useEffect(() => {
        console.log("Current page:", currentPage);
        console.log("Should change the title to Error");
        document.title = "Error";
    }, [currentPage]);


    return (
        <div className="error-container">
            <h1 className='error-h1'>¡Ups! Something went wrong.</h1>
            <p className='error-p'>Sorry for the inconvenience. Please try to go back to the start and try again.</p>
            <Link
                to="/"
                className="btn error-btn"
                aria-label="Go back to the home page"
                onClick={() => {
                    resetCurrentPage();
                }}
            >
                Home page
            </Link>
        </div>
    );
}

export default ErrorPage;