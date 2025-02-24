import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/errorPage.css';

const PwaErrorPage = () => {
  return (
    <div className="error-container">
      <h1 className='error-h1'>You are offline!</h1>
      <p className='error-p'>
        To use the full functionality of this app, please connect to the internet.
      </p>
      <p className='error-p'>
        Once you're back online, everything will work as expected.
      </p>
      <Link to="/" className="btn error-btn" aria-label="Go back to the home page" >Go back to Home</Link>
    </div>
  );
}

export default PwaErrorPage;