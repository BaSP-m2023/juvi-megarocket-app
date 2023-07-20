/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import { Profile } from 'Components/Shared';

const AdminProfile = () => {
  const { data: admin } = useSelector((state) => state.auth);

  return (
    <div>
      <Profile user={admin} />
    </div>
  );
};

export default AdminProfile;
