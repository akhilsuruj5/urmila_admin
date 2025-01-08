import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

const RecruitersPage = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);

  // Fetch recruiters from API
  const fetchRecruiters = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://urmila-webservice.onrender.com/admin/recruiters');
      const data = await response.json();
      setRecruiters(data);
    }catch (error) {
      console.error('Error fetching recruiters:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch jobs for a particular recruiter
  const fetchJobsForRecruiter = async (recruiterId) => {
    try {
      const response = await fetch(`https://urmila-webservice.onrender.com/admin/recruiters/${recruiterId}/jobs`);
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error(`Error fetching jobs for recruiter ${recruiterId}:`, error);
      setJobs([]);
    }
  };

  const handleViewJobsClick = (recruiterId) => {
    fetchJobsForRecruiter(recruiterId);
    setSelectedRecruiter(recruiterId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setJobs([]); // Clear jobs when modal is closed
  };

  useEffect(() => {
    fetchRecruiters();
  }, []);

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Recruiter Details</h1>

        {loading ? (
          <p>Loading recruiters...</p>
        ) : (
          <table className="min-w-full bg-white border shadow rounded">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Company</th>
                <th className="px-4 py-2 border">Contact</th>
                <th className="px-4 py-2 border">Created At</th>
                <th className="px-4 py-2 border">Jobs Posted</th> {/* New Column for Jobs */}
              </tr>
            </thead>
            <tbody>
              {recruiters.map((recruiter) => (
                <tr key={recruiter._id}>
                  <td className="px-4 py-2 border">{recruiter.name}</td>
                  <td className="px-4 py-2 border">{recruiter.email}</td>
                  <td className="px-4 py-2 border">{recruiter.company}</td>
                  <td className="px-4 py-2 border">{recruiter.contact}</td>
                  <td className="px-4 py-2 border">
                    {new Date(recruiter.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      className="text-blue-500"
                      onClick={() => handleViewJobsClick(recruiter._id)}
                    >
                      View Jobs
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal for Jobs */}
      {showModal && (
        <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onClick={handleCloseModal} // Optional: Close modal on background click
      >
        <div
          className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto p-6"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Jobs Posted</h2>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={handleCloseModal}
            >
              ✖
            </button>
          </div>
          <div className="space-y-4">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <div
                  key={job._id}
                  className="border-b border-gray-300 pb-4 mb-4 last:border-none last:pb-0 last:mb-0"
                >
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <p className="text-gray-600 truncate">{job.description}</p>
                  <p className="text-sm text-gray-500">
                    Salary: {job.salary || 'Not specified'}
                  </p>
                  <p className="text-sm text-gray-500">
                    Experience: {job.experience}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No jobs posted by this recruiter.</p>
            )}
          </div>
        </div>
      </div>
      
      )}
    </Layout>
  );
};

export default RecruitersPage;
