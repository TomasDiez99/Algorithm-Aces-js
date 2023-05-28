import React from 'react';

function Footer (){
    const handleGithubClick = () => {
        window.open('https://github.com/TomasDiez99/Algorithm-Aces-js', '_blank');
    };

    return (
        <footer className="bg-dark text-light">
            <div className="container py-2">
                <div className="row justify-content-center text-center">
                    <div className="col-auto">
                        <i className="fab fa-github" onClick={handleGithubClick}></i>
                    </div>
                    <div className="col-auto">
                        <i className="fab fa-react"></i>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
