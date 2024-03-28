import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Feedbackdetails.css"; // Import CSS for styling

const FeedbackDetails = () => {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    // Fetch feedback details from the backend API
    axios
      .get("https://localhost:44320/api/Test/feedback")
      .then((response) => {
        setFeedbackList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching feedback details:", error);
      });
  }, []);

  return (
    <div className="feedback-container">
      <h1 style={{ color: "white" }}>Feedback Details</h1>
      <div className="feedback-cards">
        {feedbackList.map((feedback, index) => (
          <div className="feedback-card" key={index}>
            <p className="card-text">Name: {feedback.Name}</p>
            <p className="card-text">Email: {feedback.Email}</p>
            <p className="card-text">Message: {feedback.Message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackDetails;
