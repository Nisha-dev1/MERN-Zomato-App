import React from "react";
import "../css/style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PartnerLogin = () => {

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.partnerEmail.value.trim();
    const password = e.target.partnerPassword.value;

    try {
      const res = await axios.post(
        "/api/auth/foodpartner/login",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // ✅ ensures cookies/session stored
        }
      );

      console.log("Full response:", res);
      console.log("Data from backend:", res.data);

      alert(res.data.message || "Login successful!");
      navigate("/create-food");  // 👈 SPA navigation without page reload
      
    } catch (err) {
      console.error("Login failed:", err.response || err.message);
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
      <h2>Partner Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="partnerEmail">Email</label>
          <input
            type="email"
            id="partnerEmail"
            placeholder="Enter email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="partnerPassword">Password</label>
          <input
            type="password"
            id="partnerPassword"
            placeholder="Enter password"
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
      <p>
        New Partner? <a href="/partner-register">Register</a>
      </p>
    </div>
  );
};

export default PartnerLogin;