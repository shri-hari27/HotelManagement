import React, { useState } from "react";
import axios from "axios";
import "./addhotel.css";
import { useEffect } from "react";

const AddHotelForm = () => {
  useEffect(() => {
    document.body.classList.add("body-other-components");
    return () => {
      document.body.classList.remove("body-other-components");
    };
  }, []);
  const [hotelData, setHotelData] = useState({
    name: "",
    description: "",
    amenities: [],
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotelData({ ...hotelData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Reset error message
    setError("");

    // Check if any of the input fields are empty
    if (
      !hotelData.name ||
      !hotelData.description ||
      hotelData.amenities.length === 0
    ) {
      setError("Please fill in all the fields.");
      return;
    }

    try {
      const response = await axios.post(
        "https://localhost:44320/api/Test/addhotel",
        hotelData
      );
      if (response.status === 200) {
        alert("Hotel added successfully.");
        // Clear form fields after successful submission
        setHotelData({
          name: "",
          description: "",
          amenities: [],
        });
      } else {
        setError("Failed to add hotel.");
      }
    } catch (error) {
      console.error("Error adding hotel:", error);
      setError("Failed to add hotel. Please try again later.");
    }
  };

  return (
    <div className="add-hotel-form-container">
      <h2 className="add-hotel-title">Add New Hotel</h2>
      <form onSubmit={handleSave}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={hotelData.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={hotelData.description}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Amenities:</label>
          <input
            type="text"
            name="amenities"
            value={hotelData.amenities.join(",")} // Join amenities array into a comma-separated string
            onChange={(e) =>
              setHotelData({
                ...hotelData,
                amenities: e.target.value.split(","),
              })
            } // Split comma-separated string into an amenities array
            className="form-control"
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="btn btn-primary">
          Add Hotel
        </button>
      </form>
    </div>
  );
};

export default AddHotelForm;
