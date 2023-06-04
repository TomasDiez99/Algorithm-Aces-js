import React from "react";
import "../styles/home.css";

function Footer() {
    const githubLink = "https://github.com/iaw-2023/Algorithm-Aces/";
    const reactLink = "https://react.dev/";
    const handleHyperLink = (link) => {
        window.open(link, "_blank");
    };

    return (
        <footer className="bg-dark text-light">
            <div className="container py-2">
                <div className="row justify-content-center text-center">
                    <div className="col-auto">
                        <i
                            className="fab fa-github footer-icon"
                            onClick={() => handleHyperLink(githubLink)}
                        ></i>
                    </div>
                    <div className="col-auto">
                        <i
                            className="fab fa-react footer-icon"
                            onClick={() => handleHyperLink(reactLink)}
                        ></i>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
