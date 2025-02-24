import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/errorPage.css';

const ErrorPage = () => {
  return (
    <div className="error-container">
      <h1 className='error-h1'>¡Ups! Something went wrong.</h1>
      <p className='error-p'>Sorry for the inconvenience. Please try to go back to the start and try again.</p>
      <Link to="/" className="btn error-btn" aria-label="Go back to the home page" >Home page</Link>
    </div>
  );
}

export default ErrorPage;
