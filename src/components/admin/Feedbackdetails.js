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

// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Web;

// namespace backend2.Models
// {
//     public class Feedback
//     {
//         public string Name { get; set; }
//         public string Email { get; set; }
//         public string Message { get; set; }
//     }
// }

// [HttpPost]
// [Route("feedback")]
// public IHttpActionResult SubmitFeedback(Feedback feedback)
// {
//     try
//     {
//         using (SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["conn"].ConnectionString))
//         {
//             conn.Open();
//             using (SqlCommand cmd = new SqlCommand("INSERT INTO Feedback (Name, Email, Message) VALUES (@Name, @Email, @Message)", conn))
//             {
//                 cmd.Parameters.AddWithValue("@Name", feedback.Name);
//                 cmd.Parameters.AddWithValue("@Email", feedback.Email);
//                 cmd.Parameters.AddWithValue("@Message", feedback.Message);

//                 int rowsAffected = cmd.ExecuteNonQuery();

//                 if (rowsAffected > 0)
//                 {
//                     return Ok("Feedback submitted successfully.");
//                 }
//                 else
//                 {
//                     return InternalServerError(new Exception("Failed to submit feedback."));
//                 }
//             }
//         }
//     }
//     catch (Exception ex)
//     {
//         Console.WriteLine("Error: " + ex.Message);
//         return InternalServerError(ex);
//     }
// }

// //fetch feedback
// [HttpGet]
// [Route("feedback")]
// public IHttpActionResult GetFeedback()
// {
//     try
//     {
//         List<Feedback> feedbackList = new List<Feedback>();

//         using (SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["conn"].ConnectionString))
//         {
//             conn.Open();

//             using (SqlCommand cmd = new SqlCommand("SELECT * FROM Feedback", conn))
//             {
//                 SqlDataReader reader = cmd.ExecuteReader();

//                 while (reader.Read())
//                 {
//                     Feedback feedback = new Feedback
//                     {
//                         Name = reader["Name"].ToString(),
//                         Email = reader["Email"].ToString(),
//                         Message = reader["Message"].ToString()
//                     };

//                     feedbackList.Add(feedback);
//                 }
//             }
//         }

//         return Ok(feedbackList);
//     }
//     catch (Exception ex)
//     {
//         Console.WriteLine("Error occurred: " + ex.Message);
//         return InternalServerError(ex);
//     }
// }
