import React from "react";
import "../../styles/home.css";

function NewsletterSection() {
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="container-fluid newsletter-container text-center my-4">
      <div className="row">
        <div className="col">
          <h2>
            <strong>Subscribe to our newsletter!</strong>
          </h2>
          <p>
            Sign up for our newsletter and stay updated with the latest news,
            offers, and promotions. Don't miss out on exclusive deals and
            special discounts!
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                className="form-control"
                placeholder="Your email address"
                aria-label="Your email address"
              />
              <button className="btn newsletter-confirm-btn" type="submit">
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewsletterSection;
