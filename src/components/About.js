import React from "react";
import "./About.css";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    document.body.classList.add("body-other-components");
    return () => {
      document.body.classList.remove("body-other-components");
    };
  }, []);
  return (
    <div className="about-container">
      <h1 className="abthead">About Us</h1>
      <p>
        Bookyourstay is a leading online platform for booking accommodations
        worldwide. Our mission is to provide travelers with a seamless booking
        experience, offering a wide range of options from luxury hotels to cozy
        bed and breakfasts.
      </p>
      <p>
        Founded in 2010, bookyourstay has grown to become one of the most
        trusted names in the travel industry. We partner with thousands of
        properties around the globe to ensure that our customers find the
        perfect stay for their needs and budget.
      </p>
      <p>
        At bookyourstay, we are committed to customer satisfaction. Our
        user-friendly website and dedicated customer support team make booking
        your next getaway a breeze. Whether you're planning a romantic weekend
        getaway, a family vacation, or a business trip, we've got you covered.
      </p>
      <p>
        <h2>Happy booking !</h2>
      </p>
    </div>
  );
};

export default About;
