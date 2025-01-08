import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';

const TeamPage = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    description: '',
    linkedin: '',
    image: '',
  });
  const [editMember, setEditMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetching team data from API
  const fetchTeamData = async () => {
    try {
      const response = await fetch('https://urmila-webservice.onrender.com/team');
      if (!response.ok) {
        throw new Error('Failed to fetch team data');
      }
      const data = await response.json();
      // Ensure each member has an 'id' field
      const formattedData = data.map(member => ({
        ...member,
        id: member._id,  // Convert _id to id
      }));
      setTeam(formattedData);
    } catch (error) {
      console.error('Error fetching team data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (member) => {
    setEditMember(member);
    setIsModalOpen(true);  // Open modal when edit is clicked
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditMember((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    if (editMember) {
      await handleEditMember(editMember.id, editMember);
      setIsModalOpen(false); // Close the modal after submitting the edit
      setEditMember(null);
    }
  };

  useEffect(() => {
    fetchTeamData();
  }, []);

  // Handle new member form change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Add Member form submission
  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://urmila-webservice.onrender.com/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMember),
      });
      if (!response.ok) {
        throw new Error('Failed to add team member');
      }
      const addedMember = await response.json();
      setTeam((prev) => [...prev, addedMember]);
      setNewMember({
        name: '',
        role: '',
        description: '',
        linkedin: '',
        image: '',
      });
    } catch (error) {
      console.error('Error adding team member:', error);
    }
  };

  // Handle Edit Team Member
  const handleEditMember = async (id, updatedData) => {
    try {
      const response = await fetch(`https://urmila-webservice.onrender.com/team/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        throw new Error('Failed to update team member');
      }
      const updatedMember = await response.json();
      // Update the team state with the updated member data
      setTeam((prev) =>
        prev.map((member) =>
          member.id === id ? { ...member, ...updatedMember } : member
        )
      );
    } catch (error) {
      console.error('Error editing team member:', error);
    }
  };

  // Handle Delete Team Member
  const handleDeleteMember = async (id) => {
    if (!id) {
      console.error('Member ID is missing');
      return;
    }

    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        const response = await fetch(`https://urmila-webservice.onrender.com/team/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete team member');
        }
        setTeam((prev) => prev.filter((member) => member.id !== id));
      } catch (error) {
        console.error('Error deleting team member:', error);
      }
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Team Management</h1>

        {/* Add New Team Member Form */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Member</h2>
          <form onSubmit={handleAddMember}>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={newMember.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="w-full px-4 py-2 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                name="role"
                value={newMember.role}
                onChange={handleInputChange}
                placeholder="Role"
                className="w-full px-4 py-2 border border-gray-300 rounded"
                required
              />
              <textarea
                name="description"
                value={newMember.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="w-full px-4 py-2 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                name="linkedin"
                value={newMember.linkedin}
                onChange={handleInputChange}
                placeholder="LinkedIn URL"
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="image"
                value={newMember.image}
                onChange={handleInputChange}
                placeholder="Image URL"
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Add Member
              </button>
            </div>
          </form>
        </div>

        {/* Edit Team Member Modal */}
        {isModalOpen && editMember && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Edit Member</h2>
              <form onSubmit={handleSubmitEdit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={editMember.name}
                  onChange={handleEditChange}
                  placeholder="Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  name="role"
                  value={editMember.role}
                  onChange={handleEditChange}
                  placeholder="Role"
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
                <textarea
                  name="description"
                  value={editMember.description}
                  onChange={handleEditChange}
                  placeholder="Description"
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  name="linkedin"
                  value={editMember.linkedin}
                  onChange={handleEditChange}
                  placeholder="LinkedIn URL"
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  name="image"
                  value={editMember.image}
                  onChange={handleEditChange}
                  placeholder="Image URL"
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
                <div className="flex justify-between">
                  <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">
                    Update Member
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Display Team Members */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <div
                key={member._id}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 mb-4 overflow-hidden rounded-full">
                  <img
                    src={member.image}
                    alt={`${member.name} Image`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
                <p className="text-sm text-gray-600">{member.description}</p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  LinkedIn
                </a>

                {/* Edit and Delete Actions */}
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={() => handleEditClick(member)}  // Trigger modal on edit
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteMember(member.id)}  // Ensure member.id is passed here
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TeamPage;
