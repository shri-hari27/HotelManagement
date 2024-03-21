import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./AdminDashboard.css";
import { useEffect } from "react";

const AdminDashboard = () => {
  useEffect(() => {
    document.body.classList.add("body-other-components");
    return () => {
      document.body.classList.remove("body-other-components");
    };
  }, []);

  const { bookingId } = useParams();

  const handleBookingDetails = () => {
    navigate(`/BookingDetails/${bookingId}`);
  };

  const navigate = useNavigate();
  return (
    <div className="admin-dashboard">
      <h1 className="title"></h1>
      <div className="card">
        <h2>Add New Hotel</h2>
        <p>Add a new hotel to the database.</p>
        <Link to="/hotelform" className="btn add-btn">
          Add Hotel
        </Link>
      </div>
      <div className="card">
        <h2>Delete Hotel</h2>
        <p>Delete an existing hotel from the database.</p>
        <Link to="/deletehotel" className="btn delete-btn">
          Delete Hotel
        </Link>
      </div>
      <div className="card">
        <h2>Update Hotel</h2>
        <p>Update details of an existing hotel.</p>
        <Link to="/updatehotel" className="btn update-btn">
          Update Hotel
        </Link>
      </div>
      <div className="card">
        <h2> Bookings</h2>
        <p>View details of user bookings</p>
        <Link to="/BookingDetails" className="btn user-btn">
          Booking Details
        </Link>{" "}
      </div>
      {/* <div className="card">
        <h2>User Feedback</h2>
        <p>View details of feedbacks given by users </p>
        <Link to="/admin/user-details" className="btn feed-btn">
          Booking Details
        </Link>
      </div> */}
    </div>
  );
};

export default AdminDashboard;
