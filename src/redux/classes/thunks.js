import { getClassesError, getClassesPending, getClassesSuccess } from './actions';

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
