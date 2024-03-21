import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signin.css";
import axios from "axios";

function SignIn() {
  useEffect(() => {
    document.body.classList.add("body-other-components");
    return () => {
      document.body.classList.remove("body-other-components");
    };
  }, []);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (value) => {
    setName(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleLogin = () => {
    const data = {
      Name: name,
      Password: password,
    };

    const url = "https://localhost:44320/api/Test/signin";
    axios
      .post(url, data)
      .then((result) => {
        if (result.data === "User is Invalid") {
          alert(result.data);
        } else if (result.data === "User is Valid") {
          // Assuming the backend sends the user ID along with the response
          const userId = result.data.userId; // Adjust this based on your backend response

          // Store user's ID and name in local storage
          localStorage.setItem("userName", name);

          // Navigate to the home page
          navigate("/");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Error occurred while logging in:", error);
        alert("Failed to login. Please try again.");
      });
  };
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row border rounded-5 p-4 box-area mt-3">
        <div className="col-md-12 right-box">
          <div className="row align-items-center">
            <div className="header-text mb-4">
              <h2>Hello user</h2>
              <h5>Please log-in to continue</h5>
            </div>
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
              <button
                className="btn btn-lg btn-color w-100 fs-5"
                onClick={() => handleLogin()}
              >
                Login
              </button>
            </div>

            <div className="row">
              <h5>
                {" "}
                Don't have an account?
                <Link to="/Signup">
                  <span className="link-color"> Sign Up</span>
                </Link>{" "}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
