import {
  LOGIN_ERROR,
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGOUT_ERROR,
  LOGOUT_PENDING,
  LOGOUT_SUCCESS,
  SET_AUTHENTICATION
} from 'redux/auth/constants';

const initialState = {
  authenticated: '',
  role: '',
  isLoading: false,
  error: ''
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PENDING:
    case LOGOUT_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case LOGIN_ERROR:
    case LOGOUT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        authenticated: true,
        role: action.payload.role
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        authenticated: false,
        role: null
      };
    }
    case SET_AUTHENTICATION: {
      return {
        ...state,
        isLoading: false,
        authenticated: true
      };
    }
    default:
      return state;
  }
};
