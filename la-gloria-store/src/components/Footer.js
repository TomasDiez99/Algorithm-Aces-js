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
            <a
              href={githubLink}
              target="_blank"
              className="footer-icon"
              rel="noopener noreferrer"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Github"
              onClick={() => handleHyperLink(githubLink)}
            >
              <i className="fab fa-github"></i>
              <span className="icon-text">See our repository</span>
            </a>
          </div>
          <div className="col-auto">
            <a
              href={reactLink}
              target="_blank"
              className="footer-icon"
              rel="noopener noreferrer"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="React main home"
              onClick={() => handleHyperLink(reactLink)}
            >
              <i className="fab fa-react"></i>
              <span className="icon-text">Made with React</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
