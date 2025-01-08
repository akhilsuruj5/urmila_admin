import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';

const Dashboard = () => {
  const [overviewData, setOverviewData] = useState(null);

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        const response = await fetch('https://urmila-webservice.onrender.com/admin/overview');
        const data = await response.json();
        setOverviewData(data);
      } catch (error) {
        console.error('Error fetching overview data:', error);
      }
    };

    fetchOverviewData();
  }, []);

  return (
    <Layout>

    <div className="flex">
      {/* <Sidebar /> */}
      <main className="flex-grow p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
        {overviewData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-4 shadow rounded">
              <h2 className="text-lg font-semibold">Total Users</h2>
              <p className="text-2xl font-bold">{overviewData.totalUsers}</p>
            </div>
            <div className="bg-white p-4 shadow rounded">
              <h2 className="text-lg font-semibold">Total Offerings</h2>
              <p className="text-2xl font-bold">{overviewData.totalOfferings}</p>
            </div>
            <div className="bg-white p-4 shadow rounded">
              <h2 className="text-lg font-semibold">Active Registrations</h2>
              <p className="text-2xl font-bold">{overviewData.activeRegistrations}</p>
            </div>
            <div className="bg-white p-4 shadow rounded">
              <h2 className="text-lg font-semibold">Pending Testimonials</h2>
              <p className="text-2xl font-bold">{overviewData.pendingTestimonials}</p>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </main>
    </div>
    </Layout>
  );
};

export default Dashboard;
