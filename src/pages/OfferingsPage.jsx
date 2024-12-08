import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
const OfferingsPage = () => {
  const [offerings, setOfferings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [form, setForm] = useState({
    name: '',
    type: 'course',
    description: '',
    image: '',
    maxCapacity: '',
    tableOfContent: [],
    studyMaterialLink: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [showForm, setShowForm] = useState(false);  // State to toggle form visibility

  // Fetch offerings from the server
  const fetchOfferings = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/admin/offerings?page=${page}`);
      const data = await response.json();
      setOfferings(data.offerings);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching offerings:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch offerings on page change
  useEffect(() => {
    fetchOfferings();
  }, [page]);

  // Handle form submit for both adding and editing
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Check required fields
    const newErrors = {};
    if (!form.name) newErrors.name = 'Name is required';
    if (!form.type) newErrors.type = 'Type is required';
    if (!form.description) newErrors.description = 'Description is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const url = isEditing
      ? `http://localhost:5000/admin/offerings/${editingId}`
      : 'http://localhost:5000/admin/offerings';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setForm({
        name: '',
        type: 'course',
        description: '',
        image: '',
        maxCapacity: '',
        tableOfContent: [],
        studyMaterialLink: '',
      });
      setIsEditing(false);
      setEditingId(null);
      fetchOfferings(); // Refresh the offerings list
      setShowForm(false);  // Close the form after submit
    } catch (error) {
      console.error('Error saving offering:', error);
    }
  };

  // Handle offering deletion
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this offering?');
    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:5000/admin/offerings/${id}`, { method: 'DELETE' });
      fetchOfferings();
    } catch (error) {
      console.error('Error deleting offering:', error);
    }
  };

  // Pre-fill form for editing
  const handleEdit = (offering) => {
    setForm(offering);
    setIsEditing(true);
    setEditingId(offering._id);
    setShowForm(true);  // Show form when editing
  };

  // Reset form fields
  const handleReset = () => {
    setForm({
      name: '',
      type: 'course',
      description: '',
      image: '',
      maxCapacity: '',
      tableOfContent: [],
      studyMaterialLink: '',
    });
    setErrors({});
    setIsEditing(false);
    setEditingId(null);
  };

  return (
    <Layout>

    <div className="flex">
      {/* <Sidebar /> */}
      <main className="flex-grow p-8 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Offerings Management</h1>

      {/* Button to toggle form visibility */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="px-4 py-2 bg-green-500 text-white mb-4"
      >
        {showForm ? 'Cancel' : 'Add New Offering'}
      </button>

      {/* Add/Edit Form */}
      {showForm && (
        <form onSubmit={handleFormSubmit} className="mb-6">
          <div className="mb-2">
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="block w-full mb-2 px-4 py-2 border"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div className="mb-2">
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              required
              className="block w-full mb-2 px-4 py-2 border"
            >
              <option value="course">Course</option>
              <option value="mentorship">Mentorship</option>
            </select>
            {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
          </div>
          <div className="mb-2">
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="block w-full mb-2 px-4 py-2 border"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Image URL"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="block w-full mb-2 px-4 py-2 border"
            />
          </div>
          <div className="mb-2">
            <input
              type="number"
              placeholder="Max Capacity"
              value={form.maxCapacity}
              onChange={(e) => setForm({ ...form, maxCapacity: e.target.value })}
              className="block w-full mb-2 px-4 py-2 border"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Study Material Link"
              value={form.studyMaterialLink}
              onChange={(e) => setForm({ ...form, studyMaterialLink: e.target.value })}
              className="block w-full mb-2 px-4 py-2 border"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Table of Content (comma-separated)"
              value={form.tableOfContent.join(', ')}
              onChange={(e) => setForm({ ...form, tableOfContent: e.target.value.split(',').map((item) => item.trim()) })}
              className="block w-full mb-2 px-4 py-2 border"
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white">
            {isEditing ? 'Update' : 'Add'} Offering
          </button>

          {/* Reset Button */}
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-gray-500 text-white ml-4"
          >
            Reset
          </button>
        </form>
      )}

      {/* Offerings Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full bg-white border shadow rounded">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Type</th>
              <th className="px-4 py-2 border">Max Capacity</th>
              <th className="px-4 py-2 border">Created At</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {offerings.map((offering) => (
              <tr key={offering._id}>
                <td className="px-4 py-2 border">{offering.name}</td>
                <td className="px-4 py-2 border">{offering.type}</td>
                <td className="px-4 py-2 border">{offering.maxCapacity}</td>
                <td className="px-4 py-2 border">{new Date(offering.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleEdit(offering)}
                    className="px-4 py-2 bg-blue-400 text-white mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(offering._id)}
                    className="px-4 py-2 bg-red-400 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <button
          className="px-4 py-2 bg-gray-300"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span className="mx-2">{page}</span>
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

export default OfferingsPage;
