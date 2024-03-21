import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./EditHotel.css";

const EditHotel = () => {
  const { id } = useParams(); // Get the hotel id from the URL params
  const [hotel, setHotel] = useState({
    Name: "",
    Description: "",
    Amenities: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchHotel();
  }, []);

  const fetchHotel = async () => {
    try {
      const response = await axios.get(
        `https://localhost:44320/api/Test/gethotel/${id}`
      );
      setHotel(response.data);
    } catch (error) {
      console.error("Error fetching hotel:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotel((prevHotel) => ({
      ...prevHotel,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if hotel object is valid
    if (!hotel || !hotel.Name || !hotel.Description) {
      console.error("Invalid hotel data:", hotel);
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await axios.put(
        `https://localhost:44320/api/Test/edit-hotel/${id}`,
        hotel
      );
      console.log("Update response:", response.data);
      alert("Hotel updated successfully.");
      navigate("/UpdateHotel"); // Redirect back to the hotel list page
    } catch (error) {
      console.error("Error updating hotel:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
      }
      alert("Failed to update hotel. Please try again.");
    }
  };

  return (
    <div className="edit-hotel-container">
      <h1>Edit Hotel</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="Name"
            value={hotel.Name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="Description"
            value={hotel.Description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amenities">Amenities:</label>
          <input
            type="text"
            id="amenities"
            name="Amenities"
            value={hotel.Amenities}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="update-btn1">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditHotel;
