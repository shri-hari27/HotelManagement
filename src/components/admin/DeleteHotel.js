import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./DeleteHotel.css"; // Corrected the import filename
const DeleteHotel = () => {
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
  const handleDeleteHotel = async (hotelId) => {
    try {
      await axios.delete(
        `https://localhost:44320/api/Test/deletehotel/${hotelId}`
      );
      // Remove the deleted hotel from the list
      setHotels(hotels.filter((hotel) => hotel.Id !== hotelId)); // Corrected property name to 'Id'
      alert("Hotel deleted successfully.");
    } catch (error) {
      console.error("Error deleting hotel:", error);
      alert("Failed to delete hotel. Please try again.");
    }
  };
  return (
    <div className="delete-hotel-page1">
      <h1 className="title1">Delete Hotel</h1>
      <div className="hotel-list1">
        {hotels.map((hotel) => (
          <div key={hotel.Id} className="card1">
            <h2>{hotel.Name}</h2>
            <button
              className="btn1 delete-btn1"
              onClick={() => handleDeleteHotel(hotel.Id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default DeleteHotel;
