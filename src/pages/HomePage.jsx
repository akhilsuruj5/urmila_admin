// src/pages/HomePage.js
import React from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpeg'; // Assuming logo is stored in assets folder

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleDashboardNavigation = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      alert('Please login to access the dashboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <header className="bg-white shadow py-8">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <img src={logo} alt="URMILA Logo" className="h-16 mb-4" />
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
            Welcome to URMILA
          </h1>
          <p className="text-center max-w-3xl text-gray-600">
            Bridging the gap between Academia and the Logistics Industry by
            grooming fresh graduates through mentorship and internships. Join
            us to build a successful career in the Logistics industry.
          </p>
        </div>
      </header>
      <main className="max-w-6xl mx-auto py-16 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
          Empowering Fresh Graduates
        </h2>
        <p className="text-base md:text-lg text-gray-600 mb-8">
          {isAuthenticated
            ? "You're logged in! Explore the admin tools to manage your system."
            : 'Join our mentorship programs or explore internships to kickstart your career.'}
        </p>
        <div className="flex space-x-4 justify-center">
          {!isAuthenticated ? (
            <>
              <a
                href="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded shadow"
              >
                Login
              </a>
              <a
                href="/signup"
                className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2.5 rounded shadow"
              >
                Signup
              </a>
            </>
          ) : (
            <button
              onClick={handleDashboardNavigation}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded shadow"
            >
              Go to Dashboard
            </button>
          )}
        </div>
      </main>
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} URMILA. All Rights Reserved.
          </p>
          <p className="text-sm text-gray-600 mt-2 md:mt-0">
            Bridging talent gaps between Academia and Logistics Industry.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
