import {
  getSuperAdminsError,
  getSuperAdminsPending,
  getSuperAdminsSuccess,
  deleteSuperAdminsError,
  deleteSuperAdminsSuccess,
  deleteSuperAdminsPending,
  postSuperAdminsError,
  postSuperAdminsPending,
  postSuperAdminsSuccess,
  putSuperAdminsError,
  putSuperAdminsSuccess,
  putSuperAdminsPending,
  getByIdSuperAdminsError,
  getByIdSuperAdminsSuccess,
  getByIdSuperAdminsPending
} from './actions';
export const getSuperAdmins = () => {
  return async (dispatch) => {
    const token = sessionStorage.getItem('token');
    try {
      dispatch(getSuperAdminsPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/superAdmin`, {
        method: 'GET',
        headers: { token: token }
      });
      const responseJson = await response.json();
      if (responseJson.error) {
        throw new Error(responseJson.message);
      }
      dispatch(getSuperAdminsSuccess(responseJson.data));
    } catch (error) {
      dispatch(getSuperAdminsError(error));
    }
  };
};
export const deleteSuperAdmins = (_id, setModalText, setShowModal) => {
  return async (dispatch) => {
    const token = sessionStorage.getItem('token');
    try {
      dispatch(deleteSuperAdminsPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/superAdmin/${_id}`, {
        method: 'DELETE',
        headers: { token: token }
      });
      const responseJson = await response.json();
      if (response.ok) {
        dispatch(deleteSuperAdminsSuccess(_id));
        setModalText(responseJson.message);
        setShowModal(true);
        console.log(responseJson);
      } else {
        throw new Error(responseJson.message);
      }
    } catch (error) {
      dispatch(deleteSuperAdminsError(error));
      setModalText('Error deleting SuperAdmins: ' + error);
    }
  };
};
export const addSuperAdmins = (formData, setModalText, setShowModal, setShowModalSuccess) => {
  return async (dispatch) => {
    const token = sessionStorage.getItem('token');
    try {
      const { email, password } = formData;
      dispatch(postSuperAdminsPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/superAdmin/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: token
        },
        body: JSON.stringify({ email, password })
      });
      const responseData = await response.json();
      if (response.ok) {
        const newSuperAdmin = responseData.data;
        dispatch(postSuperAdminsSuccess(newSuperAdmin));
        setModalText(responseData.message);
        setShowModalSuccess(true);
      } else {
        throw new Error(responseData.message);
      }
    } catch (error) {
      dispatch(postSuperAdminsError(error));
      setModalText('There was an error: ' + error);
      setShowModal(true);
    }
  };
};
export const editSuperAdmins = (
  updatedSuperAdmin,
  id,
  setModalText,
  setShowModal,
  setShowModalSuccess
) => {
  return async (dispatch) => {
    const token = sessionStorage.getItem('token');
    try {
      dispatch(putSuperAdminsPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/superAdmin/${id}`, {
        method: 'PUT',
        headers: { token: token },
        body: JSON.stringify(updatedSuperAdmin)
      });
      if (response.ok) {
        const responseData = await response.json();
        const updatedData = responseData.data;
        dispatch(putSuperAdminsSuccess(updatedData, id));
        setShowModalSuccess(true);
        setModalText(responseData.message);
      } else {
        const responseData = await response.json();
        throw new Error(responseData.message);
      }
    } catch (error) {
      dispatch(putSuperAdminsError(error));
      setShowModal(true);
      setModalText('There was an error: ' + error);
    }
  };
};
export const getByIdSuperAdmins = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getByIdSuperAdminsPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/superAdmin/${id}`);
      const responseJson = await response.json();
      const data = responseJson.data;
      if (responseJson.error) {
        throw new Error(responseJson.message);
      }
      dispatch(getByIdSuperAdminsSuccess(data));
    } catch (error) {
      dispatch(getByIdSuperAdminsError(error));
    }
  };
};
