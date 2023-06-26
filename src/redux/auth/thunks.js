import {
  loginError,
  loginPending,
  loginSuccess,
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

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      dispatch(loginPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      const responseJson = response.json();
      const data = responseJson.data;
      if (response.error) {
        throw new Error(responseJson.message);
      }
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('role', data.role);
      sessionStorage.setItem('email', data.email);
      dispatch(loginSuccess(data));
    } catch (error) {
      dispatch(loginError);
    }
  };
};
