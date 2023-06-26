import {
  // loginError,
  // loginPending,
  // loginSuccess,
  logoutError,
  logoutPending,
  logoutSuccess
} from 'redux/auth/actions';

export const logout = () => {
  return (dispatch) => {
    dispatch(logoutPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/auth/logout`, {
      method: 'POST',
      headers: {
        token: sessionStorage.getItem('token')
      }
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        }
        sessionStorage.clear();
        return dispatch(logoutSuccess());
      })
      .catch((error) => {
        return dispatch(logoutError(error));
      });
  };
};
