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

import { firebaseApp } from '../../helper/firebase';

export const logout = () => {
  return async (dispatch) => {
    dispatch(logoutPending());
    try {
      await firebaseApp.auth().signOut();
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('role');
      dispatch(logoutSuccess());
      return { error: false, message: 'Log Out Successfully' };
    } catch (error) {
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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/`, {
        headers: { token }
      });
      const res = await response.json();
      dispatch(getAuthenticationSuccess(res.data));
      return res.data;
    } catch (error) {
      return dispatch(getAuthenticationError(error.toString()));
    }
  };
};

export const login = (credentials) => {
  return async (dispatch) => {
    dispatch(loginPending);
    try {
      const firebaseResponse = await firebaseApp
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password);
      const token = await firebaseResponse.user.getIdToken();
      const {
        claims: { role }
      } = await firebaseResponse.user.getIdTokenResult();
      return dispatch(loginSuccess({ role, token }));
    } catch (error) {
      return dispatch(loginError(error.toString()));
    }
  };
};
