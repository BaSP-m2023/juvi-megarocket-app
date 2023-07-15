import {
  getClassesError,
  getClassesPending,
  getClassesSuccess,
  deleteClassError,
  deleteClassPending,
  deleteClassSuccess,
  postClassError,
  postClassPending,
  postClassSuccess,
  putClassError,
  putClassPending,
  putClassSuccess,
  getByIdClassError,
  getByIdClassPending,
  getByIdClassSuccess
} from './actions';

export const getClasses = () => {
  return async (dispatch) => {
    const token = sessionStorage.getItem('token');
    try {
      dispatch(getClassesPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class`, {
        method: 'GET',
        headers: { token: token }
      });
      const responseJson = await response.json();
      if (responseJson.error) {
        throw new Error(responseJson.message);
      }
      dispatch(getClassesSuccess(responseJson.data));
    } catch (error) {
      dispatch(getClassesError(error));
    }
  };
};
export const deleteClass = (id, setModalText, setShowModal) => {
  return async (dispatch) => {
    const token = sessionStorage.getItem('token');
    try {
      dispatch(deleteClassPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class/${id}`, {
        method: 'DELETE',
        headers: { token: token }
      });
      const responseJson = await response.json();
      if (responseJson.error) {
        throw new Error(responseJson.message);
      }
      dispatch(deleteClassSuccess(responseJson.data));
      setModalText('Class deleted correctly');
      setShowModal(true);
    } catch (error) {
      dispatch(deleteClassError(error));
    }
  };
};
export const postClass = (
  { activity, trainer, day, hour, slots },
  setModalText,
  setShowModal,
  setIsTrue
) => {
  return async (dispatch) => {
    const token = sessionStorage.getItem('token');
    try {
      dispatch(postClassPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: token
        },
        body: JSON.stringify({ activity, trainer, day, hour, slots })
      });
      const responseData = await response.json();
      if (responseData.error) {
        throw new Error(responseData.message);
      } else {
        setModalText('Class created correctly!');
        setShowModal(true);
        setIsTrue(true);
      }
      dispatch(postClassSuccess(response));
    } catch (error) {
      dispatch(postClassError(error));
      setModalText('Error creating Class: ' + error);
      setShowModal(true);
    }
  };
};
export const putClass = (
  id,
  { activity, trainer, day, hour, slots },
  setModalText,
  setShowModal,
  setIsTrue
) => {
  return async (dispatch) => {
    const token = sessionStorage.getItem('token');
    try {
      dispatch(putClassPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: token
        },
        body: JSON.stringify({ activity, trainer, day, hour, slots })
      });
      const responseData = await response.json();
      const updatedClassData = responseData.data;
      if (response.ok) {
        setIsTrue(true);
        setModalText('Class updated correctly!');
        setShowModal(true);
      } else {
        throw new Error(responseData.message);
      }
      dispatch(putClassSuccess(updatedClassData));
    } catch (error) {
      dispatch(putClassError(error));
      setModalText('Error updating Class: ' + error);
      setShowModal(true);
    }
  };
};

export const getByIdClasses = (id) => {
  return async (dispatch) => {
    const token = sessionStorage.getItem('token');
    try {
      dispatch(getByIdClassPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: token
        }
      });
      const responseJson = await response.json();
      const data = responseJson.data;
      if (responseJson.error) {
        throw new Error(responseJson.message);
      }
      dispatch(getByIdClassSuccess(data));
    } catch (error) {
      dispatch(getByIdClassError(error));
    }
  };
};
