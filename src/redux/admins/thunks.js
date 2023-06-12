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

export const getAdmins = async (dispatch) => {
  dispatch(getAdminsPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`);
    console.log(response);
    const data = await response.json();
    console.log(data);
    /*  if (!response.ok) {
      throw new Error(data.message);
    } */
    dispatch(getAdminsSuccess(data.data));
  } catch (error) {
    dispatch(getAdminError(error));
  }
};

export const addAdmin = async (dispatch, adminData, setModalText, setIsModalOpen, setsuccess) => {
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
    if (!response.ok) {
      setModalText('Admin created correctly!');
      setsuccess(true);
      setIsModalOpen(true);
      throw new Error(newAdmin.message);
    }
    setIsModalOpen(true);
    setModalText(newAdmin.message);
    dispatch(addAdminsSuccess(newAdmin));
  } catch (error) {
    setModalText('Creating admin ' + error);
    setIsModalOpen(true);
    dispatch(addAdminsError(error));
  }
};

export const deleteAdmin = async (dispatch, adminId, setModalText, setIsModalOpen) => {
  try {
    dispatch(deleteAdminsPending());
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${adminId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Error deleting Admin.');
    }

    dispatch(deleteAdminsSuccess());
    setModalText('Admin deleted correctly!');
    setIsModalOpen(true);
  } catch (error) {
    dispatch(deleteAdminsError());
    setModalText(`Error deleting Admin: ${error}`);
    setIsModalOpen(true);
  }
};

export const editAdmin = async (
  dispatch,
  adminData,
  adminId,
  setModalText,
  setIsModalOpen,
  setsuccess,
  setAdminsData
) => {
  try {
    dispatch(putAdminsPending());
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${adminId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(adminData)
    });
    const responseData = await response.json();
    if (response.ok) {
      const updatedAdminData = responseData.data;
      setAdminsData(
        adminData.map((admin) => (admin._id === updatedAdminData._id ? updatedAdminData : admin))
      );
      setModalText('Admin updated correctly!');
      setIsModalOpen(true);
      setsuccess(true);
    } else {
      throw new Error(responseData.message);
    }
    dispatch(putAdminsSuccess());
  } catch (error) {
    dispatch(putAdminsError());
    setModalText(`Error editing Admin: ${error}`);
  }
};
