import {
  GET_CLASSES_PENDING,
  GET_CLASSES_SUCCESS,
  GET_CLASSES_ERROR,
  DEL_CLASSES_PENDING,
  DEL_CLASSES_SUCCESS,
  DEL_CLASSES_ERROR,
  ADD_CLASSES_PENDING,
  ADD_CLASSES_SUCCESS,
  ADD_CLASSES_ERROR,
  PUT_CLASSES_PENDING,
  PUT_CLASSES_SUCCESS,
  PUT_CLASSES_ERROR,
  GET_BY_ID_CLASSES_PENDING,
  GET_BY_ID_CLASSES_SUCCESS,
  GET_BY_ID_CLASSES_ERROR
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

    case DEL_CLASSES_PENDING:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case DEL_CLASSES_SUCCESS:
      return {
        ...state,
        error: action.payload,
        list: state.list.filter((classes) => classes._id !== action.payload),
        isLoading: false
      };
    case DEL_CLASSES_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case ADD_CLASSES_PENDING:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case ADD_CLASSES_SUCCESS:
      return {
        ...state,
        error: action.payload,
        list: state.list.push(action.payload),
        isLoading: false
      };
    case ADD_CLASSES_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case PUT_CLASSES_PENDING:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case PUT_CLASSES_SUCCESS:
      return {
        ...state,
        error: action.payload,
        list: state.list.map((itemClass) =>
          itemClass._id === action.id ? action.payload : itemClass
        ),
        isLoading: false
      };
    case PUT_CLASSES_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case GET_BY_ID_CLASSES_PENDING:
      return {
        ...state,
        isLoading: false
      };
    case GET_BY_ID_CLASSES_SUCCESS:
      return {
        ...state,
        item: action.payload,
        isLoading: false
      };
    case GET_BY_ID_CLASSES_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
};
