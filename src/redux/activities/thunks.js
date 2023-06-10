import { getActivitiesError, getActivitiesPending, getActivitiesSuccess } from './actions';
import { deleteActivityError, deleteActivitySuccess, deleteActivityPending } from './actions';

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

export const deleteActivity = (_id) => {
  return async (dispatch) => {
    try {
      dispatch(deleteActivityPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activity/${_id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        dispatch(deleteActivitySuccess(_id));
        alert('Activity deleted successfully!');
      } else {
        throw new Error('Error deleting activity');
      }
    } catch (error) {
      dispatch(deleteActivityError(error));
      alert('Error deleting activity: ' + error);
    }
  };
};
