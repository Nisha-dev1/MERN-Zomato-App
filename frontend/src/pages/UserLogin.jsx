import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/style.css";  

const UserLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.userLoginEmail.value.trim();
    const password = e.target.userLoginPassword.value;

    try {
      const res = await axios.post(
        "/api/auth/user/login",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log("Full response:", res);
      console.log("Data from backend:", res.data);

      alert(res.data.message || "Login successfully");
      navigate("/");  // 👈 SPA navigation without page reload
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
      <h2>User Login</h2>
      <form onSubmit={handleSubmit}>
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
