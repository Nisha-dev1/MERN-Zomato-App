import React from "react";
import "../css/style.css";

const UserLogin = () => {
  return (
    <div className="container">
      <h2>User Login</h2>
      <form>
        <div className="form-group">
          <label htmlFor="userLoginEmail">Email</label>
          <input
            type="email"
            id="userLoginEmail"
            placeholder="example@email.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="userLoginPassword">Password</label>
          <input
            type="password"
            id="userLoginPassword"
            placeholder="Enter password"
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
      <p>
        Don’t have an account? <a href="/user-register">Register</a>
      </p>
    </div>
  );
};

export default UserLogin;
