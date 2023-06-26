import {
  // LOGIN_ERROR,
  // LOGIN_PENDING,
  // LOGIN_SUCCESS,
  LOGOUT_ERROR,
  LOGOUT_PENDING,
  LOGOUT_SUCCESS
} from 'redux/auth/constants';

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
