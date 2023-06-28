import {
  loginError,
  loginPending,
  loginSuccess,
  logoutError,
  logoutPending,
  logoutSuccess,
  getAuthenticationPending,
  getAuthenticationSuccess,
  getAuthenticationError
} from 'redux/auth/actions';

import { firebaseApp } from '../helper/firebase';

export const logout = () => {
  return async (dispatch) => {
    dispatch(logoutPending());
    try {
      await firebaseApp.auth().signOut();
      dispatch(logoutSuccess());
      sessionStorage.removeItem('token', '');
      sessionStorage.removeItem('role', '');
      return { error: false, message: 'Log Out Successfully' };
    } catch (error) {
      console.log(error);
      dispatch(logoutError(error));
      return {
        error: true,
        message: error
      };
    }
  };
};

export const getAuth = (token) => {
  return async (dispatch) => {
    dispatch(getAuthenticationPending());
    try {
      const response = fetch(`${process.env.REACT_APP_API_URL}/api/auth/`, { headers: { token } });
      const res = (await response).json();
      dispatch(getAuthenticationSuccess(res.data));
      return res.data;
    } catch (error) {
      return dispatch(getAuthenticationError(error.toString()));
    }
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
