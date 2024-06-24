import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "./logo.png";
import "../../styles/styles.css";
import { logout } from "../../redux/actions/user";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Header = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.user || {});
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <header className=" text-white p-4 flex justify-between items-center header-container ">
      <div className="flex items-center logo-div">
        <Link to="/" className="text-2xl font-bold mr-4 logo">
          <img
            src={logo}
            alt="Logo"
            style={{ height: "70px", width: "150px", borderRadius: "0.75rem" }}
          />
        </Link>
      </div>
      <div className="hidden md:flex items-center">
        {/* Ensure this div is hidden on small screens */}
        <nav className="flex items-center">
          <Link to="/about" className="mr-4">
            About Us
          </Link>
          <Link to="/products" className="mr-4">
            Products
          </Link>
          <Link to="/contact" className="mr-4">
            Contact Us
          </Link>
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
              <Link to="/signup" className="text-white  px-4 py-2 rounded">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
      <div className="md:hidden flex items-center">
        {/* Ensure this div is visible on small screens */}
        <button onClick={toggleDropdown} className="text-white">
          {dropdownVisible ? (
            <AiOutlineClose size={25} />
          ) : (
            <AiOutlineMenu size={25} />
          )}
        </button>
      </div>
      {dropdownVisible && (
        <div className="dropdown-menu bg-blue-600 text-white p-4 absolute top-16 right-4 shadow-lg rounded-lg md:hidden">
          <nav className="flex flex-col">
            <Link to="/about" className="my-2" onClick={toggleDropdown}>
              About Us
            </Link>
            <Link to="/products" className="my-2" onClick={toggleDropdown}>
              Products
            </Link>
            <Link to="/contact" className="my-2" onClick={toggleDropdown}>
              Contact Us
            </Link>
            {isAuthenticated ? (
              <>
                <span className="my-2">Welcome, {user?.name || "User"}</span>
                <button
                  onClick={() => {
                    dispatch(logout());
                    toggleDropdown();
                  }}
                  className="text-white bg-blue-800 w-full py-2 rounded mt-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="my-2" onClick={toggleDropdown}>
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-white bg-blue-800 w-full py-2 rounded mt-2 text-center"
                  onClick={toggleDropdown}
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
