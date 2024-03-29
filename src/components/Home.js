import React, { useEffect, useState } from "react";
import "./Home.css";

const Home = () => {
  const backgroundImages = [
    "url('/homeA.jpeg')",
    "url('/homeB.jpeg')",
    "url('/homeC.jpeg')",
    "url('/homeD.jpeg')",
    "url('/homeE.jpeg')",

    // Add more background image URLs as needed
  ];

  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    setBackgroundImage(backgroundImages[randomIndex]);
  }, []);

  return (
    <div
      className="home-container"
      style={{ backgroundImage: backgroundImage }}
    >
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
          <p>Search for hotels and resorts as per your needs.</p>
        </div>
        <div className="feature">
          <i className="fas fa-star"></i>
          <h2>Curated Listings</h2>
          <p>
            Discover handpicked accommodations with numerous options of
            amenities .
          </p>
        </div>
        <div className="feature">
          <i className="fas fa-calendar-alt"></i>
          <h2>Flexible Booking</h2>
          <p>Book your stay with secure payments.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
