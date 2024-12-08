import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assuming you have useAuth to access the logout method

const Sidebar = () => {
  const { logout } = useAuth(); // Use the logout function from AuthContext

  return (
    <aside className="w-64 bg-gray-800 text-white h-screen flex flex-col">
      <div className="p-4 text-2xl font-bold border-b border-gray-700" >
        URMILA Admin
      </div>
      <nav className="flex-grow p-4 space-y-4">
        <Link to="/dashboard" className="block px-4 py-2 rounded hover:bg-gray-700">
          Dashboard
        </Link>
        <Link to="/users" className="block px-4 py-2 rounded hover:bg-gray-700">
          Users
        </Link>
        <Link to="/offerings" className="block px-4 py-2 rounded hover:bg-gray-700">
          Offerings
        </Link>
        <Link to="/registrations" className="block px-4 py-2 rounded hover:bg-gray-700">
          Course Registrations
        </Link>
        <Link to="/testimonials" className="block px-4 py-2 rounded hover:bg-gray-700">
          Testimonials
        </Link>
        <Link to="/team" className="block px-4 py-2 rounded hover:bg-gray-700">
          Team
        </Link>
      </nav>
      {/* Logout button */}
      <div className="p-4 border-t border-gray-700 mt-auto">
        <button
          onClick={logout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
