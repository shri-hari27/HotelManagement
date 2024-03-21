import React from "react";
import "./Contact.css"; // Import your CSS file for styling
import { useEffect } from "react";
const Contact = () => {
  useEffect(() => {
    document.body.classList.add("body-other-components");
    return () => {
      document.body.classList.remove("body-other-components");
    };
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="contact-container">
      <h1 className="conhead">Contact Us</h1>
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
        <h2>Feedback Form:</h2>
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
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
