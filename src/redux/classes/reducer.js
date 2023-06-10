import {
  GET_CLASSES_PENDING,
  GET_CLASSES_SUCCESS,
  GET_CLASSES_ERROR,
  DELETE_CLASS_PENDING,
  DELETE_CLASS_SUCCESS,
  DELETE_CLASS_ERROR
} from './constants';

const initialState = {
  list: [],
  item: {},
  isLoading: false,
  error: ''
};

export const classReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CLASSES_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_CLASSES_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };
    case GET_CLASSES_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case DELETE_CLASS_PENDING:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case DELETE_CLASS_SUCCESS:
      return {
        ...state,
        error: action.payload,
        list: state.list.filter((classes) => classes._id !== action.payload),
        isLoading: false
      };
    case DELETE_CLASS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
};
