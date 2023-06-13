import {
  GET_ADMIN_SUCCESS,
  GET_ADMIN_PENDING,
  GET_ADMIN_ERROR,
  ADD_ADMIN_SUCCESS,
  ADD_ADMIN_PENDING,
  ADD_ADMIN_ERROR,
  GET_BY_ID_ADMIN_SUCCESS,
  GET_BY_ID_ADMIN_PENDING,
  GET_BY_ID_ADMIN_ERROR,
  DEL_ADMIN_SUCCESS,
  DEL_ADMIN_PENDING,
  DEL_ADMIN_ERROR,
  PUT_ADMIN_SUCCESS,
  PUT_ADMIN_PENDING,
  PUT_ADMIN_ERROR
} from './constants';

const initialState = {
  list: [],
  item: {},
  isLoading: false,
  error: ''
};

export const adminsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADMIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_ADMIN_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };
    case GET_ADMIN_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case GET_BY_ID_ADMIN_PENDING:
      return {
        ...state,
        isLoading: false
      };
    case GET_BY_ID_ADMIN_SUCCESS:
      return {
        ...state,
        item: action.payload,
        isLoading: false
      };
    case GET_BY_ID_ADMIN_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case ADD_ADMIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_ADMIN_SUCCESS:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case ADD_ADMIN_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case PUT_ADMIN_PENDING:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case PUT_ADMIN_SUCCESS:
      return {
        ...state,
        admins: state.list.map((admin) => (admin.id === action.payload.id ? action.payload : admin))
      };
    case PUT_ADMIN_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case DEL_ADMIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DEL_ADMIN_SUCCESS:
      return {
        ...state,
        error: action.payload,
        list: state.list.filter((admin) => admin._id !== action.payload),
        isLoading: false
      };
    case DEL_ADMIN_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    default:
      return state;
  }
};
