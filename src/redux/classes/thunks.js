import {
  getClassesError,
  getClassesPending,
  getClassesSuccess,
  deleteClassError,
  deleteClassPending,
  deleteClassSuccess
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
