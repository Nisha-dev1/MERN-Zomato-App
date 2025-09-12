import React from "react";
import "../css/style.css";
import axios from "axios";

const UserRegister = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullName = e.target.fullName.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("/api/auth/user/register", {
        fullName,
        email,
        password,
        confirmPassword,
      }, {
        headers: {
          "Content-Type": "application/json",
        }
      });

      console.log("Server response:", res.data);
      alert(res.data.message || "Registration successful");
      window.location.href = "/user-login";
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
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input type="text" id="fullName" name="fullName" placeholder="John Doe" required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="example@email.com" required />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter password" required />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>   
          <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm password" required />
        </div>

        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a href="/user-login">Login</a></p>
    </div>
  );
};

export default UserRegister;