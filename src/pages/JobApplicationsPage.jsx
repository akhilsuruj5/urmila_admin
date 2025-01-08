import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

const JobApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null); // For modal
  const [modalOpen, setModalOpen] = useState(false);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://urmila-webservice.onrender.com/admin/applications');
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Open modal with job details
  const handleJobClick = (job) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedJob(null);
  };

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Job Applications</h1>

        {loading ? (
          <p>Loading applications...</p>
        ) : (
          <table className="min-w-full bg-white border shadow rounded">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Job</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Applied At</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application._id}>
                  <td className="px-4 py-2 border">{application.name}</td>
                  <td
                    className="px-4 py-2 border cursor-pointer text-blue-500"
                    onClick={() =>
                      application.jobId && handleJobClick(application.jobId)
                    }
                  >
                    {application.jobId?.title || 'N/A'} {/* Safely access title */}
                  </td>
                  <td className="px-4 py-2 border">{application.email}</td>
                  <td className="px-4 py-2 border">{application.phone}</td>
                  <td className="px-4 py-2 border">{application.status}</td>
                  <td className="px-4 py-2 border">
                    {new Date(application.appliedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Job Details Modal */}
        {modalOpen && selectedJob && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
              <h2 className="text-xl font-bold mb-4">{selectedJob.title}</h2>
              <div className="space-y-4">
                <p><strong>Description:</strong></p>
                <div className="h-60 overflow-y-auto border p-4">
                  <p style={{ whiteSpace: 'pre-line' }}>{selectedJob.description}</p>
                </div>
                <p><strong>Location:</strong> {selectedJob.location}</p>
                <p><strong>Experience:</strong> {selectedJob.experience} years</p>
                <p><strong>Requirements:</strong> {selectedJob.requirements}</p>
              </div>
              <button
                onClick={handleCloseModal}
                className="mt-4 text-red-500"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default JobApplicationsPage;
