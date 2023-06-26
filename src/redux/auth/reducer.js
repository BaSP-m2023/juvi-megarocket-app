import {
  // LOGIN_ERROR,
  // LOGIN_PENDING,
  // LOGIN_SUCCESS,
  LOGOUT_ERROR,
  LOGOUT_PENDING,
  LOGOUT_SUCCESS
} from 'redux/auth/constants';

const initialState = {
  isLoading: false,
  error: ''
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case LOGOUT_PENDING:
      return {
        ...state,
        error: false,
        isLoading: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        error: false,
        isLoading: false
      };
  }
};
