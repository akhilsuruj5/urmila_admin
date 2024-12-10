import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';

const RegistrationsPage = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [status, setStatus] = useState('pending');
  const [offeringType, setOfferingType] = useState('');
  const [userOccupation, setUserOccupation] = useState('');

  const [selectedUser, setSelectedUser] = useState(null);
const [isPopupOpen, setIsPopupOpen] = useState(false);

const fetchUserProfile = async (userId) => {
  try {
    const response = await fetch(`https://urmila-backend.onrender.com/admin/usersProfile/${userId}`);
    const data = await response.json();
    setSelectedUser(data);
    setIsPopupOpen(true);
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
};


  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://urmila-backend.onrender.com/admin/registrations?page=${page}&status=${status}&offeringType=${offeringType}&userOccupation=${userOccupation}`
      );
      const data = await response.json();
      setRegistrations(data.registrations);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchRegistrations();
  }, [page, status, offeringType, userOccupation]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await fetch(`https://urmila-backend.onrender.com/admin/registrations/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchRegistrations();
    } catch (error) {
      console.error('Error updating registration status:', error);
    }
  };

  return (
    <Layout>

      <div className="flex">
      {/* <Sidebar /> */}
      <main className="flex-grow p-8 bg-gray-100">

      <h1 className="text-2xl font-bold mb-6">Course Registrations</h1>

      <div className="mb-4 flex items-center space-x-4">
        <select
          className="px-4 py-2 border"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select
          className="px-4 py-2 border"
          value={offeringType}
          onChange={(e) => setOfferingType(e.target.value)}
          >
          <option value="">All Offerings</option>
          <option value="course">Course</option>
          <option value="mentorship">Mentorship</option>
        </select>
        <select
          className="px-4 py-2 border"
          value={userOccupation}
          onChange={(e) => setUserOccupation(e.target.value)}
        >
          <option value="">All Occupations</option>
          <option value="Student">Student</option>
          <option value="Professional">Professional</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full bg-white border shadow rounded">
          <thead>
            <tr>
              <th className="px-4 py-2 border">User Name</th>
              <th className="px-4 py-2 border">Offering Name</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Registered At</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((registration) => (
              <tr key={registration._id}>
                <td className="px-4 py-2 border">
  <button
    className="text-blue-500 underline"
    onClick={() => fetchUserProfile(registration.user._id)}
  >
    {registration.user.name}
  </button>
</td>

                <td className="px-4 py-2 border">{registration.offering.name}</td>
                <td className="px-4 py-2 border">{registration.status}</td>
                
                <td className="px-4 py-2 border">{new Date(registration.registeredAt).toLocaleDateString()}</td>
                <td className="px-4 py-2 border">
                  <button
                    className="text-green-500 mr-4"
                    onClick={() => handleStatusChange(registration._id, 'completed')}
                  >
                    Approve
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => handleStatusChange(registration._id, 'cancelled')}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isPopupOpen && selectedUser && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
      <h2 className="text-xl font-bold mb-4">User Profile</h2>
      <p><strong>Name:</strong> {selectedUser.name}</p>
      <p><strong>Email:</strong> {selectedUser.email}</p>
      <p><strong>Institution:</strong> {selectedUser.institution}</p>
      <p><strong>Occupation:</strong> {selectedUser.occupation}</p>
      <p><strong>Phone No:</strong> {selectedUser.phone}</p>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setIsPopupOpen(false)}
      >
        Close
      </button>
    </div>
  </div>
)}


      <div className="mt-4 flex justify-between items-center">
        <button
          className="px-4 py-2 bg-gray-300"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          >
          Previous
        </button>
        <span className="mx-4">Page {page} of {totalPages}</span>
        <button
          className="px-4 py-2 bg-gray-300"
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
          </main>
    </div>
    </Layout>
  );
};

export default RegistrationsPage;
