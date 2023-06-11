import {
  getActivitiesError,
  getActivitiesPending,
  getActivitiesSuccess,
  deleteActivityError,
  deleteActivitySuccess,
  deleteActivityPending,
  postActivitiesError,
  postActivitiesPending,
  postActivitiesSuccess,
  putActivitiesError,
  putActivitiesSuccess,
  putActivitiesPending,
  getByIdActivityError,
  getByIdActivitySuccess,
  getByIdActivityPending
} from './actions';

export const getActivities = () => {
  return async (dispatch) => {
    try {
      dispatch(getActivitiesPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activity`);
      const responseJson = await response.json();
      const data = responseJson.data;
      if (responseJson.error) {
        throw new Error(responseJson.message);
      }
      dispatch(getActivitiesSuccess(data));
    } catch (error) {
      dispatch(getActivitiesError(error));
    }
  };
};

export const deleteActivity = (_id, setModalText) => {
  return async (dispatch) => {
    try {
      dispatch(deleteActivityPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activity/${_id}`, {
        method: 'DELETE'
      });
      const responseJson = await response.json();

      if (response.ok) {
        dispatch(deleteActivitySuccess(_id));
        setModalText(responseJson.message);
      } else {
        throw new Error('Error deleting activity');
      }
    } catch (error) {
      dispatch(deleteActivityError(error));
      setModalText('Error deleting activity: ' + error);
    }
  };
};

export const addActivity = (formData, setModalText, setShowModal) => {
  return async (dispatch) => {
    try {
      const { name, description } = formData;
      dispatch(postActivitiesPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activity/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description })
      });
      const responseData = await response.json();

      if (response.ok) {
        const newActivity = responseData.data;
        dispatch(postActivitiesSuccess(newActivity));
        setModalText(responseData.message);
        setShowModal(true);
      } else {
        throw new Error(responseData.message);
      }
    } catch (error) {
      dispatch(postActivitiesError(error));
      setModalText('There was an error' + error);
      setShowModal(true);
    }
  };
};
export const editActivity = (updatedActivity, id, setModalText, setShowModal) => {
  return async (dispatch) => {
    try {
      dispatch(putActivitiesPending);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activity/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedActivity)
      });

      if (response.ok) {
        const responseData = await response.json();
        const updatedData = responseData.data;
        dispatch(putActivitiesSuccess(updatedData, id));
        setShowModal(true);
        setModalText(responseData.message);
      } else {
        const responseData = await response.json();
        throw new Error(responseData.message);
      }
    } catch (error) {
      dispatch(putActivitiesError(error));
      setShowModal(true);
      setModalText('There was an error' + error);
    }
  };
};
export const getByIdActivity = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getByIdActivityPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activity/${id}`);
      const responseJson = await response.json();
      const data = responseJson.data;
      if (responseJson.error) {
        throw new Error(responseJson.message);
      }
      dispatch(getByIdActivitySuccess(data));
    } catch (error) {
      dispatch(getByIdActivityError(error));
    }
  };
};
