import React from "react";
import "../css/style.css";

const PartnerRegister = () => {
  
  return (
    <div className="container">
      <h2>Food Partner Registration</h2>
      <form>
        <div className="form-row">
           <div className="form-group">
            <label htmlFor="businessName">Business Name</label>
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
