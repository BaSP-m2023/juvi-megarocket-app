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
    try {
      dispatch(getClassesPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class`);
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
export const deleteClass = (id) => {
  return async (dispatch) => {
    try {
      dispatch(deleteClassPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class/${id}`, {
        method: 'DELETE'
      });
      const responseJson = await response.json();
      if (responseJson.error) {
        throw new Error(responseJson.message);
      }
      dispatch(deleteClassSuccess(responseJson.data));
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
    try {
      dispatch(postClassPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
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
    try {
      dispatch(putClassPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
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

export const getByIdClasses = (id, setSelectedClass) => {
  return async (dispatch) => {
    try {
      dispatch(getByIdClassPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class/${id}`);
      const responseJson = await response.json();
      const data = responseJson.data;
      if (responseJson.error) {
        throw new Error(responseJson.message);
      }
      setSelectedClass({
        activity: data.activity._id,
        trainer: data.trainer._id,
        day: data.day,
        hour: data.hour,
        slots: data.slots
      });
      dispatch(getByIdClassSuccess(data));
    } catch (error) {
      dispatch(getByIdClassError(error));
    }
  };
};
