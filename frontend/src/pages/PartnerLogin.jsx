import React from "react";
import "../css/style.css";

const PartnerLogin = () => {
  return (
    <div className="container">
      <h2>Partner Login</h2>
      <form>
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
