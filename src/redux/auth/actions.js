import {
  LOGIN_ERROR,
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGOUT_ERROR,
  LOGOUT_PENDING,
  LOGOUT_SUCCESS,
  GET_AUTHENTICATION_PENDING,
  GET_AUTHENTICATION_SUCCESS,
  GET_AUTHENTICATION_ERROR
} from 'redux/auth/constants';

export const loginPending = () => {
  return {
    type: LOGIN_PENDING
  };
};

export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data
  };
};

export const loginError = (error) => {
  return {
    type: LOGIN_ERROR,
    payload: error
  };
};

export const logoutError = (error) => ({
  type: LOGOUT_ERROR,
  payload: error
});

export const logoutPending = () => ({
  type: LOGOUT_PENDING
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS
});

export const getAuthenticationPending = () => {
  return {
    type: GET_AUTHENTICATION_PENDING
  };
};

export const getAuthenticationSuccess = (data) => {
  return {
    type: GET_AUTHENTICATION_SUCCESS,
    payload: data
  };
};

export const getAuthenticationError = (error) => {
  return {
    type: GET_AUTHENTICATION_ERROR,
    payload: error
  };
};
