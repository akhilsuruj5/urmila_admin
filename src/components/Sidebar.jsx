import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, Users, BookOpen, ClipboardList, MessageSquare, GroupIcon as Team, Briefcase, FileText, LogOut } from 'lucide-react';

const Sidebar = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: Home },
    { to: "/users", label: "Users", icon: Users },
    { to: "/offerings", label: "Offerings", icon: BookOpen },
    { to: "/registrations", label: "Course Registrations", icon: ClipboardList },
    { to: "/testimonials", label: "Testimonials", icon: MessageSquare },
    { to: "/team", label: "Team", icon: Team },
    { to: "/recruiters", label: "Recruiters", icon: Briefcase },
    { to: "/applications", label: "Job Applications", icon: FileText },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white h-screen flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-2xl font-bold">URMILA Admin</h1>
      </div>
      <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex items-center px-4 py-3 rounded transition-colors duration-200 ${
              location.pathname === item.to
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={logout}
          className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors duration-200"
        >
          <LogOut className="w-5 h-5 mr-2" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

