import React from "react";
import "../css/style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PartnerRegister = () => {

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // collect values from form
    const Name = e.target.businessName.value.trim();
    const contactName = e.target.contactName.value.trim();
    const phone = e.target.phone.value.trim();
    const email = e.target.partnerEmail.value.trim();
    const password = e.target.partnerPassword.value;
    const address = e.target.partnerAddress.value.trim();

    try {
      const res = await axios.post(
        "/api/auth/foodpartner/register",
        {
          name: Name, // 🔹 backend expects lowercase
          contactName,
          phone,
          email,
          password,
          address,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // ✅ cookies will be saved
        }
      );

      console.log("Partner registration response:", res.data);

      alert(res.data.message || "Registration successful!");
      navigate("/create-food"); // redirect to login page after successful registration
    } catch (err) {
      console.error("Registration failed:", err.response || err.message);
      alert(
        err.response?.data?.message ||
          err.response?.statusText ||
          err.message ||
          "Server not reachable"
      );
    }
  };

  return (
    <div className="container">
      <h2>Food Partner Sign up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="businessName">Name</label>
            <input
              type="text"
              id="businessName"
              placeholder="Foodie's Delight"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="contactName">Contact Name</label>
            <input
              type="text"
              id="contactName"
              placeholder="John Doe"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              placeholder="+91 9876543210"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="partnerEmail">Email</label>
          <input
            type="email"
            id="partnerEmail"
            placeholder="yourbusiness@email.com"
            required
          />
        </div>

        {/* Password */}
        <div className="form-group">
          <label htmlFor="partnerPassword">Password</label>
          <input
            type="password"
            id="partnerPassword"
            placeholder="Enter password"
            required
          />
        </div>

        {/* Address */}
        <div className="form-group">
          <label htmlFor="partnerAddress">Business Address</label>
          <input
            type="text"
            id="partnerAddress"
            placeholder="123, Main Street, City"
            required
          />
        </div>

        <button type="submit">Register</button>
      </form>
      <p>
        Already a Partner? <a href="/partner-login">Login</a>
      </p>
    </div>
  );
};

export default PartnerRegister;
