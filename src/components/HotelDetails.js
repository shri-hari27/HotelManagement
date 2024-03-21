import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./HotelDetails.css"; // Import CSS file for styling

const HotelDetails = () => {
  const [hotelDetails, setHotelDetails] = useState(null);
  const { hotelId } = useParams();

  useEffect(() => {
    fetchHotelDetails();
  }, [hotelId]);

  const fetchHotelDetails = async () => {
    try {
      const response = await axios.get(
        `https://localhost:44320/api/Test/gethotel/${hotelId}`
      );
      setHotelDetails(response.data);
    } catch (error) {
      console.error("Error fetching hotel details:", error);
    }
  };

  return (
    <div className="hotel-details-container">
      <h1 className="hotel-details-title">Hotel Details</h1>
      {hotelDetails ? (
        <div className="hotel-details-content">
          <p className="hotel-details-item">
            <strong>Name:</strong> {hotelDetails.Name}
          </p>
          <p className="hotel-details-item">
            <strong>Description:</strong> {hotelDetails.Description}
          </p>
          <p className="hotel-details-item">
            <strong>Amenities:</strong> {hotelDetails.Amenities.join(", ")}
          </p>

          <div className="image-wrapper">
            <img
              src={`/${hotelDetails.Id}a.jpg`}
              // src={`/images/Sun.jpg`}
              alt={hotelDetails.hotelId}
              style={{ width: "40%", height: "auto" }}
            />
            <br />
            <img
              src={`/${hotelDetails.Id}b.jpg`}
              // src={`/images/Sun.jpg`}
              alt={hotelDetails.hotelId}
              style={{ width: "40%", height: "auto" }}
            />
            <br />
            <img
              src={`/${hotelDetails.Id}c.jpg`}
              // src={`/images/Sun.jpg`}
              alt={hotelDetails.hotelId}
              style={{ width: "40%", height: "auto" }}
            />
            <img
              src={`/${hotelDetails.Id}d.jpg`}
              // src={`/images/Sun.jpg`}
              alt={hotelDetails.hotelId}
              style={{ width: "40%", height: "auto" }}
            />
          </div>
          {/* Add other hotel details here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default HotelDetails;
