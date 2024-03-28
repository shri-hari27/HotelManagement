// App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SearchPage from "./SearchPage";
import Hotels from "../src/components/Hotels";
import Contact from "./components/Contact";
import About from "./components/About";
import AllHotels from "./components/AllHotels";
import Signup from "./components/Signup";
import SignIn from "./components/Signin";
import AddHotelForm from "./components/admin/addhotel";
import HotelDetails from "./components/HotelDetails";
import UpdateHotel from "./components/admin/UpdateHotel";
import EditHotel from "./components/admin/EditHotel";
import Booknow from "./components/Booknow"; // Import the Booknow component
import AdminDashboard from "./components/admin/AdminDashboard";
import DeleteHotel from "./components/admin/DeleteHotel";
import Payments from "./components/Payment";
import Thankyou from "./components/Thankyou";
import BookingDetails from "./components/admin/BookingDetails";
import FeedbackDetails from "./components/admin/Feedbackdetails";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/all-hotels" element={<AllHotels />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Signin" element={<SignIn />} />
          <Route path="/hotelform" element={<AddHotelForm />} />
          <Route path="/DeleteHotel" element={<DeleteHotel />} />
          <Route path="/UpdateHotel" element={<UpdateHotel />} />
          <Route path="/edit-hotel/:id" element={<EditHotel />} />
          <Route path="/BookingDetails" element={<BookingDetails />} />
          <Route path="/Feedbackdetails" element={<FeedbackDetails />} />

          {/* Updated route path */}
          <Route path="/HotelDetails/:hotelId" element={<HotelDetails />} />
          <Route path="/booknow/:hotelId" element={<Booknow />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/Payments" element={<Payments />} />
          <Route path="/Thankyou" element={<Thankyou />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
