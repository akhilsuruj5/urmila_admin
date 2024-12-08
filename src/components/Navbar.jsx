// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.jpeg'; // Assuming logo is stored in assets folder

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-green-600 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <div className="flex items-center space-x-4">
        <img src={logo} alt="URMILA Logo" className="h-10" />
        <h1
          onClick={() => window.location.replace('/')}
          className="text-2xl font-bold cursor-pointer"
        >
          URMILA
        </h1>
      </div>
      <ul className="flex space-x-4">
        {isAuthenticated ? (
          <li>
            <button
              onClick={logout}
              className="bg-white text-green-600 hover:bg-gray-100 px-4 py-2 rounded shadow"
            >
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                className="hover:bg-green-500 px-4 py-2 rounded"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="bg-white text-green-600 hover:bg-gray-100 px-4 py-2 rounded shadow"
              >
                Signup
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
