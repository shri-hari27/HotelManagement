import React, { useState, useEffect } from "react";
import "./Contact.css"; // Import your CSS file for styling

const Contact = () => {
  useEffect(() => {
    document.body.classList.add("body-other-components");
    return () => {
      document.body.classList.remove("body-other-components");
    };
  }, []);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    // Send form data to backend endpoint
    try {
      const response = await fetch(
        "https://localhost:44320/api/Test/feedback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setFeedbackSent(true);
        window.alert("Feedback Sent!"); // Display alert here
      } else {
        alert("Failed to send feedback. Please try again.");
      }
    } catch (error) {
      alert("Error sending feedback. Please try again later.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="contact-container">
      <h1 style={{ color: "black" }}>Contact info :</h1>
      <div className="contact-info">
        <div className="address">
          <h2>Address:</h2>
          <p>
            #999 6th main 7th cross Becker's street electronic city <br />
            <br />
            Banglore, Karnataka - 560022
            <br />
            <br />
            India
          </p>
        </div>
        <div className="phone">
          <h2>Phone:</h2>
          <p>Main: 9988775511</p>
          <p>Customer Service: 9944555234</p>
        </div>
        <div className="email">
          <h2>Email:</h2>
          <p>General Inquiries: bookyourstay@gmail.com</p>
          <p>Customer Support: bookyourstaysup@gmail.com</p>
        </div>
      </div>
      <div className="feedback-form">
        <h1 style={{ color: "black" }}>Feedback Form:</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>
          <button className="conbtn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
