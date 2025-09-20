import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import UserLogin from "../pages/UserLogin";
import PartnerLogin from "../pages/PartnerLogin";
import UserRegister from "../pages/UserRegister";
import PartnerRegister from "../pages/PartnerRegister";
import Home from "../pages/general/Home";
import CreateFood from "../pages/food-partner/CreateFood";
import Profile from "../pages/food-partner/Profile";



const AppRoutes = () => {
  const [darkMode, setDarkMode] = useState(true);
  const location = useLocation(); // ✅ to check current path

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Show theme toggle only on login/register pages
  const showToggle = [
    "/user-login",
    "/partner-login",
    "/user-register",
    "/partner-register"
  ].includes(location.pathname);

  return (
    <>
      {showToggle && (
        <button
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "🌞" : "🌙"}
        </button>
      )}

      <Routes>
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/partner-login" element={<PartnerLogin />} />
        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/partner-register" element={<PartnerRegister />} />
        <Route path="/" element={<Home />} />
        <Route path="/create-food" element={<CreateFood />} />
        <Route path="/food-partner/:id" element={<Profile />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
