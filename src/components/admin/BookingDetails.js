import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./BookingDetails.css";

const BookingDetails = () => {
  const [bookingDetails, setBookingDetails] = useState([]);
  const { bookingId } = useParams();
  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(
          `https://localhost:44320/api/Test/GetAllBookingDetails`
        );
        setBookingDetails(response.data);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };

    fetchBookingDetails();
  }, [bookingId]); // Add bookingId to the dependency array if needed

  return (
    <div className="booking-details-container">
      <h1>Booking Details</h1>
      {bookingDetails.length > 0 ? (
        bookingDetails.map((booking) => (
          <div className="booking-item" key={booking.BookingId}>
            <p className="booking-id">Booking ID: {booking.BookingId}</p>
            <p className="booking-info">Hotel ID: {booking.HotelId}</p>
            <p className="booking-info">Check-In Date: {booking.CheckInDate}</p>
            <p className="booking-info">
              Check-Out Date: {booking.CheckOutDate}
            </p>
            <p className="booking-info">Number of Rooms: {booking.NumRooms}</p>
            <p className="booking-info">Total Price: {booking.TotalPrice}</p>
            <p className="booking-info">Name: {booking.Name}</p>
            <br />
          </div>
        ))
      ) : (
        <p className="no-booking">No booking details available.</p>
      )}
    </div>
  );
};

export default BookingDetails;
