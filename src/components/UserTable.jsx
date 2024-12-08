import React, { useState, useEffect } from "react";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [occupation, setOccupation] = useState("");
  const [isVerified, setIsVerified] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [page, setPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [editingUser, setEditingUser] = useState(null);

  const saveEdit = async () => {
    try {
      await fetch(`http://localhost:5000/admin/users/${editingUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingUser),
      });
      setEditingUser(null);
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error("Error saving user edits:", error);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page,
        search,
        occupation,
        sortBy,
        limit,
      });

      if (isVerified !== "") {
        query.append("isVerified", isVerified);
      }
      const response = await fetch(
        `http://localhost:5000/admin/users?${query.toString()}`
      );
      const data = await response.json();
      setUsers(data.users);
      setTotalUsers(data.totalUsers);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search, occupation, isVerified, sortBy]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:5000/admin/users/${id}`, {
        method: "DELETE",
      });
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">User Management</h1>

      {/* Search and Filter */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Name, Email, or Phone"
          className="px-4 py-2 border border-gray-300 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="ml-4 px-4 py-2 border border-gray-300 rounded"
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
        >
          <option value="">All Occupations</option>
          <option value="Student">Student</option>
          <option value="Professional">Professional</option>
        </select>
        <select
          className="ml-4 px-4 py-2 border border-gray-300 rounded"
          value={isVerified}
          onChange={(e) => setIsVerified(e.target.value)}
        >
          <option value="">All Verification Status</option>
          <option value="true">Verified</option>
          <option value="false">Not Verified</option>
        </select>
      </div>

      {/* User Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300 shadow rounded">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Occupation</th>
              <th className="px-4 py-2 border">Verification</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-4 py-2 border">{user.name}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">{user.phone}</td>
                <td className="px-4 py-2 border">{user.occupation}</td>
                <td className="px-4 py-2 border">
                  {user.isVerified ? "Verified" : "Not Verified"}
                </td>
                <td className="px-4 py-2 border">
                  <button
                    className="text-blue-500"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 ml-4"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editingUser && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit User</h2>
            <input
              type="text"
              value={editingUser.name}
              onChange={(e) =>
                setEditingUser({ ...editingUser, name: e.target.value })
              }
            />
            <input
              type="email"
              value={editingUser.email}
              onChange={(e) =>
                setEditingUser({ ...editingUser, email: e.target.value })
              }
            />
            <button onClick={saveEdit}>Save</button>
            <button onClick={() => setEditingUser(null)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="mt-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span className="mx-4">
          Page {page} of {totalPages}
        </span>

        <select value={limit} onChange={(e) => setLimit(e.target.value)}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>

        <button
          className="px-4 py-2 bg-gray-300 rounded"
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserTable;
