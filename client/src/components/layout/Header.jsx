// src/components/layout/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "./logo.png";
import "../../styles/styles.css";
import { logout } from "../../redux/actions/user";

const Header = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user || {});
  const dispatch = useDispatch();

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center header-container">
      <div className="flex items-center">
        <Link to="/" className="text-2xl font-bold mr-4 logo">
          <img
            src={logo}
            alt=""
            style={{ height: "70px", width: "150px", borderRadius: "0.75rem" }}
          />
        </Link>
      </div>
      <div className="nav-links">
        <nav>
          <Link to="/about" className="mr-4">
            About Us
          </Link>
          <Link to="/products" className="mr-4">
            Products
          </Link>
          <Link to="/contact" className="mr-4">
            Contact Us
          </Link>
        </nav>
      </div>
      <div className="flex items-center">
        {isAuthenticated ? (
          <>
            <span className="mr-4">Welcome, {user?.name || "User"}</span>
            <button
              onClick={() => dispatch(logout())}
              className="text-white bg-blue-800 px-4 py-2 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">
              Login
            </Link>
            <Link
              to="/signup"
              className="text-white bg-blue-800 px-4 py-2 rounded"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
