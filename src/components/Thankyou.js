// ThankYouPage.js
import React from "react";
import { Link } from "react-router-dom";
import "./Thankyou.css";

const ThankYouPage = () => {
  return (
    <div className="thank-you-container">
      <h1 className="thank-you-heading">
        Thank You for Booking Your Stay with us !
      </h1>
      <p className="thank-you-message">
        We wish you have a wonderful time ahead !
      </p>
      <Link to="/" className="btn-back-to-home">
        Back to Home
      </Link>
    </div>
  );
};

export default ThankYouPage;
