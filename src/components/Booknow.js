import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Booknow.css";
import axios from "axios";

const Booknow = () => {
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [numRooms, setNumRooms] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const { hotelId } = useParams();
  const Name = localStorage.getItem("userName");

  const confirmBooking = async () => {
    try {
      if (!validateForm()) {
        alert("Please fill in all required fields.");
        return;
      }

      const calculatedTotalPrice = calculatePrice();
      setTotalPrice(calculatedTotalPrice);

      const bookingData = {
        HotelId: hotelId,
        CheckInDate: checkInDate,
        CheckOutDate: checkOutDate,
        NumRooms: numRooms,
        TotalPrice: calculatedTotalPrice,
        Name: Name,
      };

      const url = "https://localhost:44320/api/Test/Booking";
      const response = await axios.post(url, bookingData);
      console.log(response.data);

      alert("Booking details are inserted!");
      redirectToPayments(); // Redirect to Payments page
    } catch (error) {
      console.error("Error occurred while booking:", error);
      alert("Failed to insert.");
    }
  };

  const validateForm = () => {
    return checkInDate && checkOutDate && numRooms > 0;
  };

  const calculatePrice = () => {
    const numDays = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const pricePerRoomPerDay = 100;
    const totalPrice = numRooms * pricePerRoomPerDay * numDays;
    return totalPrice;
  };

  const minSelectableDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  };
  const redirectToPayments = () => {
    window.location.href = "/Payments"; // Update with the correct URL if needed
  };
  return (
    <div className="booknow-container">
      <h1 className="booknowtitle">Choose your preference!</h1>
      <div className="form-group">
        <label>Check-In Date:</label>
        <DatePicker
          selected={checkInDate}
          onChange={(date) => setCheckInDate(date)}
          className="form-control"
          minDate={minSelectableDate()}
          required
        />
      </div>
      <div className="form-group">
        <label>Check-Out Date:</label>
        <DatePicker
          selected={checkOutDate}
          onChange={(date) => setCheckOutDate(date)}
          className="form-control"
          minDate={minSelectableDate()}
          required
        />
      </div>
      <div className="form-group">
        <label>Number of Rooms:</label>
        <select
          value={numRooms}
          onChange={(e) => setNumRooms(parseInt(e.target.value))}
          className="form-control"
          required
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>
      </div>
      <div className="total-price">
        <label>Total Price:</label>
        <p>${calculatePrice()}</p>
      </div>
      <button className="btn btn-primary" onClick={confirmBooking}>
        Confirm Booking
      </button>
    </div>
  );
};

export default Booknow;
