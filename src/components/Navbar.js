import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  // Get the user's name and role from local storage
  const userName = localStorage.getItem("userName");
  // const userRole = localStorage.getItem("userRole");

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          bookyourstay
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/search">Explore</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>

          {userName ? (
            <>
              {userName === "admin" && (
                <li>
                  <Link to="/admindashboard">Admin Dashboard</Link>
                </li>
              )}
              <li>
                <span className="username">Welcome, {userName}</span>
              </li>
              <li>
                <Link
                  to="/signin"
                  onClick={() => {
                    localStorage.removeItem("userName");
                    localStorage.removeItem("userRole"); // Remove user role on signout
                    window.location.reload();
                  }}
                >
                  Signout
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/signin">Signin</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
