import React from "react";
import "./Home.css";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.body.classList.add("body-other-components");
    return () => {
      document.body.classList.remove("body-other-components");
    };
  }, []);
  return (
    <div className="home-container">
      <div className="hero">
        <h1 className="title" style={{ fontSize: "40px", fontWeight: "bold" }}>
          Find Your Perfect Stay{" "}
        </h1>
        <p className="title0 " style={{ fontSize: "20px" }}>
          Book with ease and discover amazing places to stay.
        </p>
      </div>
      <div className="features">
        <div className="feature">
          <i className="fas fa-search"></i>
          <h2>Search & Explore</h2>
          <p>
            Search for hotels, resorts, or vacation rentals in any destination.
          </p>
        </div>
        <div className="feature">
          <i className="fas fa-star"></i>
          <h2>Curated Listings</h2>
          <p>
            Discover handpicked accommodations with top ratings and reviews.
          </p>
        </div>
        <div className="feature">
          <i className="fas fa-calendar-alt"></i>
          <h2>Flexible Booking</h2>
          <p>
            Book your stay with flexible cancellation policies and secure
            payments.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
