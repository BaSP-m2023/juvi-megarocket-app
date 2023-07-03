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

const initialState = {
  authenticated: '',
  role: '',
  data: '',
  isLoading: false,
  error: ''
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PENDING:
    case GET_AUTHENTICATION_PENDING:
    case LOGOUT_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case LOGIN_ERROR:
    case GET_AUTHENTICATION_ERROR:
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
    case GET_AUTHENTICATION_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        authenticated: true,
        data: action.payload
      };
    }
    default:
      return state;
  }
};
