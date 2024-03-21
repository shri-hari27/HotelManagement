import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./UpdateHotel.css"; // Import CSS file for styling

const HotelList = () => {
  useEffect(() => {
    document.body.classList.add("body-other-components");
    return () => {
      document.body.classList.remove("body-other-components");
    };
  }, []);
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await axios.get(
        "https://localhost:44320/api/Test/gethotel"
      );
      setHotels(response.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  return (
    <div className="hotel-list-container">
      <h1>Update hotel</h1>
      <div className="hotel-card-list">
        {hotels.map((hotel) => (
          <div key={hotel.Id} className="hotel-card">
            <h2>{hotel.Name}</h2>

            <Link to={`/edit-hotel/${hotel.Id}`} className="edit-btn">
              Edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelList;
