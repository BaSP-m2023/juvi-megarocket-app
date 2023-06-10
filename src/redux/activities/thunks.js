import { getActivitiesError, getActivitiesPending, getActivitiesSuccess } from './actions';

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
