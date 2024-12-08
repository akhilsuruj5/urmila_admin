import React from 'react';
import UserTable from '../components/UserTable';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';

const UserManagement = () => {
  return (
    <Layout>
      <div className="p-6">
        <UserTable />
      </div>
    </Layout>
  );
};

export default UserManagement;
