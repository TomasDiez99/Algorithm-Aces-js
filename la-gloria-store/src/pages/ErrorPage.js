import React from 'react';
import { Link } from 'react-router-dom';
import '../errorPage.css';

const ErrorPage = () => {
  return (
    <div className="error-container">
      <h1 className='error-h1'>¡Ups! Ha ocurrido un error.</h1>
      <p className='error-p'>Lamentamos las molestias. Por favor, intenta volver al inicio e intenta nuevamente.</p>
      <Link to="/" className="btn btn-primary error-btn">Volver al inicio</Link>
    </div>
  );
}

export default ErrorPage;
