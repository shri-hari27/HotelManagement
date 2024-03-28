import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Hotels.css";

const Hotels = () => {
  useEffect(() => {
    document.body.classList.add("body-other-components");
    return () => {
      document.body.classList.remove("body-other-components");
    };
  }, []);

  const navigate = useNavigate();

  return (
    <div className="hotels-container">
      <h2 className="hotels-title">
        Explore the wide ranges of hotels and resorts!
      </h2>
      <div className="hotel-option">
        <img src="/hotellogo.jpg" alt="Hotel" className="hotel-image" />
        <div className="hotel-info">
          <h3 className="hotel-name">
            Click below to check out the wide range of hotels and resorts
            available!
          </h3>
          <p className="hotel-description">
            Hotels and resorts both provide accommodation services for
            travelers. Hotels offer short-term stays with amenities like
            restaurants and conference facilities, catering to various guests.
            Resorts, typically located in scenic areas, offer a comprehensive
            vacation experience with accommodations, dining, entertainment, and
            leisure activities, aiming to create a destination in itself for
            relaxation and enjoyment.
          </p>
          <Link to="/all-hotels">
            <button className="book-now-button">Explore Now</button>
          </Link>
        </div>
      </div>
      <div className="image-container">
        <img
          onClick={() => navigate("/HotelDetails/1")}
          src="/1b.jpg"
          alt="Hotel"
          className="hotel-image1"
        />
        <img
          onClick={() => navigate("/HotelDetails/1")}
          src="/1a.jpg"
          alt="Hotel"
          className="hotel-image1"
        />
        <img
          onClick={() => navigate("/HotelDetails/1")}
          src="/1c.jpg"
          alt="Hotel"
          className="hotel-image1"
        />
        <img
          onClick={() => navigate("/HotelDetails/1")}
          src="/1d.jpg"
          alt="Hotel"
          className="hotel-image1"
        />
        <img
          onClick={() => navigate("/HotelDetails/2")}
          src="/2a.jpg"
          alt="Hotel"
          className="hotel-image1"
        />
        <img
          onClick={() => navigate("/HotelDetails/2")}
          src="/2b.jpg"
          alt="Hotel"
          className="hotel-image1"
        />
        <img
          onClick={() => navigate("/HotelDetails/2")}
          src="/2c.jpg"
          alt="Hotel"
          className="hotel-image1"
        />
        <img
          onClick={() => navigate("/HotelDetails/2")}
          src="/2d.jpg"
          alt="Hotel"
          className="hotel-image1"
        />
        <img
          onClick={() => navigate("/HotelDetails/12")}
          src="/12a.jpg"
          alt="Hotel"
          className="hotel-image1"
        />
        <img
          onClick={() => navigate("/HotelDetails/12")}
          src="/12b.jpg"
          alt="Hotel"
          className="hotel-image1"
        />
        <img
          onClick={() => navigate("/HotelDetails/12")}
          src="/12c.jpg"
          alt="Hotel"
          className="hotel-image1"
        />
        <img
          onClick={() => navigate("/HotelDetails/12")}
          src="/12d.jpg"
          alt="Hotel"
          className="hotel-image1"
        />
        <img
          onClick={() => navigate("/HotelDetails/3")}
          src="/3a.jpg"
          alt="Hotel"
          className="hotel-image1"
        />
        <img
          onClick={() => navigate("/HotelDetails/3")}
          src="/3b.jpg"
          alt="Hotel"
          className="hotel-image1"
        />
        <img
          onClick={() => navigate("/HotelDetails/3")}
          src="/3c.jpg"
          alt="Hotel"
          className="hotel-image1"
        />
        <img
          onClick={() => navigate("/HotelDetails/3")}
          src="/3d.jpg"
          alt="Hotel"
          className="hotel-image1"
        />
      </div>
    </div>
  );
};

export default Hotels;
