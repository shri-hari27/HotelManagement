import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";
import axios from "axios";

function SignUp() {
  useEffect(() => {
    document.body.classList.add("body-other-components");
    return () => {
      document.body.classList.remove("body-other-components");
    };
  }, []);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleNameChange = (value) => {
    setName(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handleSave = () => {
    // Check if any of the input fields are empty
    if (!name || !password || !email) {
      alert("Please fill in all the fields.");
      return; // Exit the function if any field is empty
    }

    // Proceed with registration if all fields are filled
    const data = {
      Name: name,
      Password: password,
      Email: email,
    };
    const url = "https://localhost:44320/api/Test/signup";
    axios
      .post(url, data)
      .then((response) => {
        if (response.data === "Registration successful.") {
          localStorage.setItem("userName", name);
          alert("Registration successful.");
        } else {
          alert(response.data);
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data === "Username already exists."
        ) {
          alert("Username already taken. Please choose a different username.");
        } else {
          alert("Failed to register user.");
        }
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row border rounded-5 p-3 shadow box-area">
        {/* Right Box */}
        <div className="col-md-12 right-box">
          <div className="row align-items-center">
            <div className="header-text mb-4">
              <h2>Join Us!</h2>
              <h5>Create an account to get started</h5>
            </div>
            <form id="signup-form">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Username"
                  onChange={(e) => handleNameChange(e.target.value)}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Password"
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Email Address"
                  onChange={(e) => handleEmailChange(e.target.value)}
                  required
                />
              </div>

              <div className="input-group sign-in-btn mb-3">
                <button
                  type="button"
                  className="btn btn-color w-100 fs-5"
                  onClick={() => handleSave()}
                >
                  Sign Up
                </button>
              </div>
            </form>
            <div className="row">
              <h5>
                Already have an account?
                <Link to="/signin">
                  <span className="link-color"> Sign In</span>
                </Link>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
