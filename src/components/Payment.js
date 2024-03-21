import React, { useState, useParams } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS for the date picker
import "./Payment.css"; // Import the CSS file
import axios from "axios"; // Import Axios for HTTP requests
import { Link } from "react-router-dom";

const Payment = () => {
  //   const { BookingId } = useParams(); //
  const [expiryDate, setExpiryDate] = useState(null); // State for the expiry date
  const [bookingData, setBookingData] = useState({
    nameOnCard: "",
    cardNumber: "",
    cvv: "",
  });
  const [error, setError] = useState(""); // State for error message

  // Function to handle input changes in the booking form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData({ ...bookingData, [name]: value });
  };

  // Function to handle booking confirmation
  const confirmPayment = () => {
    if (
      !bookingData.nameOnCard ||
      !bookingData.cardNumber ||
      !bookingData.cvv ||
      !expiryDate
    ) {
      setError("Please fill in all fields to proceed.");
      return;
    }

    setError(""); // Clear any previous error messages

    // Send payment data to the backend
    const paymentData = {
      nameOnCard: bookingData.nameOnCard,
      cardNumber: bookingData.cardNumber,
      cvv: bookingData.cvv,
      expiryDate: expiryDate,
    };

    // const url = "https://localhost:44320/api/Test/Payment"; // Update the URL with your backend endpoint
    // axios
    //   .post(url, paymentData)
    //   .then((response) => {
    //     console.log(response.data); // Log the response from the backend
    //     // Redirect to the thank you page or handle success as needed
    //   })

    //   .catch((error) => {
    //     console.error("Error occurred while processing payment:", error); // Log detailed error message
    //     // Handle payment error (e.g., show error message to the user)
    //   });
  };

  return (
    <>
      <h2 className="payment-title">Payments</h2>
      <div className="payment-form">
        {/* Display error message if there's an error */}
        {error && <div className="error-message">{error}</div>}

        {/* Name on Card input */}
        <div className="form-group">
          <label htmlFor="nameOnCard" className="form-label">
            Name on card:
          </label>
          <input
            type="text"
            id="nameOnCard"
            name="nameOnCard"
            placeholder="Enter name on card"
            className="form-input"
            value={bookingData.nameOnCard}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* Card Number input */}
        <div className="form-group">
          <label htmlFor="cardNumber" className="form-label">
            Card number:
          </label>
          <input
            type="text" // Change type to text for card number input
            id="cardNumber"
            name="cardNumber"
            placeholder="Enter card number"
            className="form-input"
            value={bookingData.cardNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* Expiry date input with date picker */}
        <div className="form-group">
          <label htmlFor="expDate" className="form-label">
            Expiry date:
          </label>
          {/* Date picker for selecting expiry date */}
          <DatePicker
            selected={expiryDate}
            onChange={(date) => setExpiryDate(date)}
            className="form-input"
            placeholderText="Select expiry date"
            minDate={new Date()} // Set minDate to today's date
          />
        </div>
        {/* CVV input */}
        <div className="form-group">
          <label htmlFor="cvv" className="form-label">
            CVV:
          </label>
          <input
            type="password" // Change type to password for hidden input
            id="cvv"
            name="cvv"
            placeholder="Enter CVV"
            className="form-input"
            value={bookingData.cvv}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* Confirm Payment button */}
        <div className="form-group">
          <Link className="btn btn-primary" to="/Thankyou">
            Confirm Payment
          </Link>
        </div>
      </div>
    </>
  );
};

export default Payment;
