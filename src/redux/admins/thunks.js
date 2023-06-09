import { FETCH_ADMINS, ADD_ADMIN, REMOVE_ADMIN, EDIT_ADMIN } from './constants';

export const fetchAdminsAsync = (setModalText) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`);
      if (!response.ok) {
        throw new Error('Failed to fetch admins.');
      }
      const jsonData = await response.json();
      const adminData = jsonData.data;

      dispatch({
        type: FETCH_ADMINS,
        payload: adminData
      });
    } catch (error) {
      setModalText(`Error getting Admins: ${error}`);
    }
  };
};

export const addAdminAsync = (adminData, setModalText) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(adminData)
      });
      if (!response.ok) {
        throw new Error('Failed to add admin.');
      }
      const jsonData = await response.json();
      const newAdmin = jsonData.data;

      dispatch({
        type: ADD_ADMIN,
        payload: newAdmin
      });
    } catch (error) {
      setModalText(`Error adding Admin: ${error}`);
    }
  };
};

export const removeAdminAsync = (adminId, setModalText, setIsModalOpen) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${adminId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete admin.');
      }

      dispatch({
        type: REMOVE_ADMIN,
        payload: adminId
      });
    } catch (error) {
      setModalText(`Error deleting Admin: ${error}`);
      setIsModalOpen(true);
    }
  };
};

export const editAdminAsync = (adminData, adminId, setModalText) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${adminId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(adminData)
      });
      if (!response.ok) {
        throw new Error('Failed to edit admin.');
      }
      const jsonData = await response.json();
      const editedAdmin = jsonData.data;

      dispatch({
        type: EDIT_ADMIN,
        payload: editedAdmin
      });
    } catch (error) {
      setModalText(`Error editing Admin: ${error}`);
    }
  };
};
