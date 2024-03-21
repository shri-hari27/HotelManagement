// Filter.js
import React from "react";
import "./Filter.css";

const Filter = ({ countries }) => {
  return (
    <div>
      <div className="filter-container">
        <select className="filter-select">
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
        <select className="filter-select">
          <option value="">Select State</option>
          {/* Add state options here */}
        </select>
        <select className="filter-select">
          <option value="">Select City</option>
          {/* Add city options here */}
        </select>
        <div className="filter-checkbox">
          <input type="checkbox" id="swimming-pool" />
          <label htmlFor="swimming-pool">Swimming Pool</label>
        </div>
        <div className="filter-checkbox">
          <input type="checkbox" id="gym" />
          <label htmlFor="gym">Gym</label>
        </div>
        <div className="filter-checkbox">
          <input type="checkbox" id="fun-games" />
          <label htmlFor="fun-games">Fun Games</label>
        </div>
        <div className="filter-checkbox">
          <input type="checkbox" id="spa" />
          {/* <label htmlFor="spa">Spa</label> */}
        </div>
        <div className="filter-checkbox">
          <input type="checkbox" id="wifi" />
          <label htmlFor="wifi">Wi-Fi</label>
        </div>
        <div className="filter-checkbox">
          <input type="checkbox" id="pet-friendly" />
          <label htmlFor="pet-friendly">Pet Friendly</label>
        </div>
      </div>
      <button className="filter-button">Apply Filter</button>
    </div>
  );
};

export default Filter;
