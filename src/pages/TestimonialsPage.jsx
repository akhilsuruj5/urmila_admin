import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [editTestimonial, setEditTestimonial] = useState(null);
  const [editFields, setEditFields] = useState({
    name: "",
    linkedin: "",
    text: "",
  });

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://urmila-backend.onrender.com/admin/testimonials?page=${page}&status=${statusFilter}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch testimonials");
      }

      const data = await response.json();
      setTestimonials(data.testimonials);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      alert("An error occurred while fetching testimonials.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, [page, statusFilter]);

  const handleStatusChange = async (id, status) => {
    try {
      const response = await fetch(
        `https://urmila-backend.onrender.com/admin/testimonials/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating testimonial:", errorData);
        return alert(`Failed to update status: ${errorData.message}`);
      }

      alert("Testimonial status updated successfully");
      fetchTestimonials();
    } catch (error) {
      console.error("Error updating testimonial status:", error);
      alert("An error occurred while updating the testimonial.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this testimonial?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `https://urmila-backend.onrender.com/admin/testimonials/${id}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error deleting testimonial:", errorData);
        return alert(`Failed to delete testimonial: ${errorData.message}`);
      }

      alert("Testimonial deleted successfully");
      fetchTestimonials();
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      alert("An error occurred while deleting the testimonial.");
    }
  };

  const handleEdit = (testimonial) => {
    setEditTestimonial(testimonial);
    setEditFields({
      name: testimonial.name,
      linkedin: testimonial.linkedin,
      text: testimonial.text,
    });
  };

  const submitEdit = async () => {
    try {
      const response = await fetch(
        `https://urmila-backend.onrender.com/admin/testimonials/${editTestimonial._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: editFields.name,
            linkedin: editFields.linkedin,
            text: editFields.text,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating testimonial:", errorData);
        return alert(`Failed to update testimonial: ${errorData.message}`);
      }

      alert("Testimonial updated successfully");
      setEditTestimonial(null); // Close the edit modal
      fetchTestimonials(); // Refresh testimonials list
    } catch (error) {
      console.error("Error updating testimonial:", error);
      alert("An error occurred while updating the testimonial.");
    }
  };

  return (
    <Layout>
      <div className="flex">
        <main className="flex-grow p-8 bg-gray-100">
          <h1 className="text-2xl font-bold mb-6">Testimonials Management</h1>

          {/* Filters */}
          <div className="mb-4">
            <label className="mr-4">Filter by Status:</label>
            <select
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value)} // Ensure this updates correctly
  className="px-4 py-2 border"
>
  <option value="all">All</option>
  <option value="pending">Pending</option>
  <option value="approved">Approved</option>
  <option value="rejected">Rejected</option>
</select>

          </div>

          {/* Testimonials Table */}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="min-w-full bg-white border border-gray-300 shadow rounded">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">LinkedIn</th>
                  <th className="px-4 py-2 border">Text</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map((testimonial) => (
                  <tr key={testimonial._id}>
                    <td className="px-4 py-2 border">{testimonial.name}</td>
                    <td className="px-4 py-2 border">
                      <a
                        href={testimonial.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500"
                      >
                        LinkedIn
                      </a>
                    </td>
                    <td
                      className="px-4 py-2 border truncate"
                      style={{ maxWidth: "150px" }}
                    >
                      {testimonial.text}
                    </td>
                    <td className="px-4 py-2 border">{testimonial.status}</td>
                    <td className="px-4 py-2 border">
                      <button
                        className="text-blue-500"
                        onClick={() => handleEdit(testimonial)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 ml-2"
                        onClick={() => handleDelete(testimonial._id)}
                      >
                        Delete
                      </button>
                      {testimonial.status !== "approved" && (
                        <button
                          className="text-green-500 ml-2"
                          onClick={() =>
                            handleStatusChange(testimonial._id, "approved")
                          }
                        >
                          Approve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Edit Modal */}
          {editTestimonial && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded shadow-md max-w-md">
      <h2 className="text-xl font-bold mb-4">Edit Testimonial</h2>
      <input
        type="text"
        value={editFields.name}
        onChange={(e) =>
          setEditFields({ ...editFields, name: e.target.value })
        }
        className="w-full px-4 py-2 border rounded mb-4"
        placeholder="Name"
      />
      <input
        type="text"
        value={editFields.linkedin}
        onChange={(e) =>
          setEditFields({ ...editFields, linkedin: e.target.value })
        }
        className="w-full px-4 py-2 border rounded mb-4"
        placeholder="LinkedIn URL"
      />
      <textarea
        value={editFields.text}
        onChange={(e) =>
          setEditFields({ ...editFields, text: e.target.value })
        }
        className="w-full px-4 py-2 border rounded mb-4"
        rows="5"
        placeholder="Testimonial Text"
      />
      <p className="text-sm text-gray-600 mb-4">
        To include a link in your testimonial, use an anchor tag like this:
        <br />
        <code className="block bg-gray-100 p-2 mt-1 rounded text-gray-800">
          {'<a href="URL" target="_blank" rel="noopener noreferrer" class="underline text-blue-500">LINK</a>'}
        </code>
      </p>
      <div className="flex justify-end">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          onClick={() => setEditTestimonial(null)}
        >
          Cancel
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={submitEdit}
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
)}

        </main>
      </div>
    </Layout>
  );
};

export default TestimonialsPage;
