import {
  getAdminsSuccess,
  getAdminsPending,
  getAdminError,
  getByIdAdminsSuccess,
  getByIdAdminsPending,
  getByIdAdminsError,
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
export const getByIdAdmins = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getByIdAdminsPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${id}`);
      const responseJson = await response.json();
      const data = responseJson.data;
      if (responseJson.error) {
        throw new Error(responseJson.message);
      }
      dispatch(getByIdAdminsSuccess(data));
    } catch (error) {
      dispatch(getByIdAdminsError(error));
    }
  };
};
export const addAdmin = (adminData, switchModal) => {
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
        switchModal(false, jsonData.message);
        return dispatch(addAdminsSuccess(newAdmin));
      } else {
        throw new Error(jsonData.message);
      }
    } catch (error) {
      switchModal(true, error);
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

export const editAdmin = (adminId, data, switchModal) => {
  return async (dispatch) => {
    try {
      dispatch(putAdminsPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${adminId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();
      if (response.ok) {
        switchModal(false, responseData.message);
        dispatch(putAdminsSuccess(responseData.data));
      } else {
        throw new Error(responseData.message);
      }
    } catch (error) {
      switchModal(true, error);
      dispatch(putAdminsError(error));
    }
  };
};
