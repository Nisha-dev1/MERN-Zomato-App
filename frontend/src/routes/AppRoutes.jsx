import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import UserLogin from "../pages/UserLogin";
import PartnerLogin from "../pages/PartnerLogin";
import UserRegister from "../pages/UserRegister";
import PartnerRegister from "../pages/PartnerRegister";

const AppRoutes = () => {
  const [darkMode, setDarkMode] = useState(true); // ✅ default: dark mode

  useEffect(() => {
    // ✅ Load saved theme from localStorage if exists
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

  return (
    <>
      {/* 🌙 / 🌞 theme toggle */}
      <button
        className="theme-toggle"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "🌞" : "🌙"}
      </button>

      <Routes>
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/partner-login" element={<PartnerLogin />} />
        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/partner-register" element={<PartnerRegister />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
