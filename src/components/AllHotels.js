import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./AllHotels.css";

const AllHotels = () => {
  useEffect(() => {
    document.body.classList.add("body-other-components");
    return () => {
      document.body.classList.remove("body-other-components");
    };
  }, []);

  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [amenitiesFilter, setAmenitiesFilter] = useState([]);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await axios.get(
        "https://localhost:44320/api/Test/gethotel"
      );
      setHotels(response.data);
      setFilteredHotels(response.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  const applyFilters = async () => {
    try {
      const selectedAmenities = amenitiesFilter.join(",");
      const response = await axios.get(
        `https://localhost:44320/api/Test/gethotel/amenities/${selectedAmenities}`
      );
      setFilteredHotels(response.data);
    } catch (error) {
      console.error("Error fetching filtered hotels:", error);
    }
  };

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    if (checked) {
      setAmenitiesFilter([...amenitiesFilter, id]);
    } else {
      setAmenitiesFilter(amenitiesFilter.filter((amenity) => amenity !== id));
    }
  };

  return (
    <div className="page-container">
      <h1>Here are the Hotels and Resorts available</h1>
      <div className="filter-container">
        {[
          "swimming-pool",
          "gym",
          "fun-games",
          "spa",
          "wifi",
          "pet-friendly",
        ].map((amenity) => (
          <div className="filter-checkbox" key={amenity}>
            <input
              type="checkbox"
              id={amenity}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={amenity}>{amenity.split("-").join(" ")}</label>
          </div>
        ))}
      </div>
      <button className="filter-button" onClick={applyFilters}>
        Apply Filter
      </button>

      <div className="grid-container">
        {filteredHotels.map((hotel, index) => (
          <div key={index} className="grid-card">
            <h2>{hotel.Name}</h2>
            <p>{hotel.Description}</p>
            <Link to={`/HotelDetails/${hotel.Id}`}>
              <button className="card-button">Details</button>
            </Link>

            <Link to={`/booknow/${hotel.Id}`}>
              <button className="card-button">Book Now</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllHotels;
