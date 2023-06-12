import {
  getAdminsSuccess,
  getAdminsPending,
  getAdminError,
  addAdminsSuccess,
  addAdminsPending,
  addAdminsError,
  deleteAdminsSuccess,
  deleteAdminsPending,
  deleteAdminsError,
  putAdminsSuccess,
  putAdminsPending,
  putAdminsError
} from './actions';

export const getAdmins = () => {
  return async (dispatch) => {
    try {
      dispatch(getAdminsPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`);
      const data = await response.json();
      if (response.error) {
        throw new Error(data.message);
      }
      dispatch(getAdminsSuccess(data.data));
    } catch (error) {
      dispatch(getAdminError(error));
    }
  };
};

export const addAdmin = (adminData, setModalText, setIsModalOpen, setSuccess) => {
  return async (dispatch) => {
    try {
      dispatch(addAdminsPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(adminData)
      });
      const jsonData = await response.json();
      const newAdmin = jsonData.data;
      if (response.ok) {
        setModalText('Admin created correctly!');
        setSuccess(true);
        setIsModalOpen(true);
        return dispatch(addAdminsSuccess(newAdmin));
      }
      dispatch(addAdminsError(jsonData.error));
      setIsModalOpen(true);
      setModalText(`${jsonData.message}`);
    } catch (error) {
      dispatch(addAdminsError(error));
    }
  };
};

export const deleteAdmin = (adminId, setModalText, setIsModalOpen) => {
  return async (dispatch) => {
    try {
      dispatch(deleteAdminsPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${adminId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Error deleting Admin.');
      }

      dispatch(deleteAdminsSuccess());
      dispatch(getAdmins());
      setModalText('Admin deleted correctly!');
      setIsModalOpen(true);
    } catch (error) {
      dispatch(deleteAdminsError());
      setModalText(`Error deleting Admin: ${error}`);
      setIsModalOpen(true);
    }
  };
};

export const editAdmin = (adminId, formData, setSuccess, setModalText, setIsModalOpen) => {
  return async (dispatch) => {
    try {
      dispatch(putAdminsPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${adminId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const responseData = await response.json();
      if (response.ok) {
        setIsModalOpen(true);
        setSuccess(true);
        setModalText('Admin edited successfully ');
        return dispatch(putAdminsSuccess(responseData.data));
      }
      dispatch(putAdminsError(responseData.error));
      setIsModalOpen(true);
      setModalText(`${responseData.message}`);
    } catch (error) {
      return dispatch(putAdminsError(error));
    }
  };
};
