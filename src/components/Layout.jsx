import React from 'react';
import Sidebar from './Sidebar'; 

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 overflow-y-auto h-screen bg-gray-100">
        {children}
      </div>
    </div>
  );
};

export default Layout;
