import {
  LOGIN_ERROR,
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGOUT_ERROR,
  LOGOUT_PENDING,
  LOGOUT_SUCCESS
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
