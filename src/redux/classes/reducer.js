import {
  GET_CLASSES_PENDING,
  GET_CLASSES_SUCCESS,
  GET_CLASSES_ERROR,
  DEL_CLASS_PENDING,
  DEL_CLASS_SUCCESS,
  DEL_CLASS_ERROR,
  POST_CLASS_PENDING,
  POST_CLASS_SUCCESS,
  POST_CLASS_ERROR,
  PUT_CLASS_PENDING,
  PUT_CLASS_SUCCESS,
  PUT_CLASS_ERROR,
  GET_BY_ID_CLASS_PENDING,
  GET_BY_ID_CLASS_SUCCESS,
  GET_BY_ID_CLASS_ERROR
} from './constants';

const initialState = {
  list: [],
  item: {},
  isLoading: false,
  error: ''
};

export const classesReducer = (state = initialState, action) => {
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

    case DEL_CLASS_PENDING:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case DEL_CLASS_SUCCESS:
      return {
        ...state,
        error: action.payload,
        list: state.list.filter((classes) => classes._id !== action.payload),
        isLoading: false
      };
    case DEL_CLASS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case POST_CLASS_PENDING:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case POST_CLASS_SUCCESS:
      return {
        ...state,
        error: action.payload,
        list: state.list.push(action.payload),
        isLoading: false
      };
    case POST_CLASS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case PUT_CLASS_PENDING:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case PUT_CLASS_SUCCESS:
      return {
        ...state,
        error: action.payload,
        list: state.list.map((itemClass) =>
          itemClass._id === action.id ? action.payload : itemClass
        ),
        isLoading: false
      };
    case PUT_CLASS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case GET_BY_ID_CLASS_PENDING:
      return {
        ...state,
        isLoading: false
      };
    case GET_BY_ID_CLASS_SUCCESS:
      return {
        ...state,
        item: action.payload,
        isLoading: false
      };
    case GET_BY_ID_CLASS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
};
