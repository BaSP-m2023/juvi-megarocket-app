import {
  GET_TRAINERS_SUCCESS,
  GET_TRAINERS_PENDING,
  GET_TRAINERS_ERROR,
  GET_BY_ID_TRAINERS_SUCCESS,
  GET_BY_ID_TRAINERS_PENDING,
  GET_BY_ID_TRAINERS_ERROR,
  ADD_TRAINERS_SUCCESS,
  ADD_TRAINERS_PENDING,
  ADD_TRAINERS_ERROR,
  DEL_TRAINERS_SUCCESS,
  DEL_TRAINERS_PENDING,
  DEL_TRAINERS_ERROR,
  PUT_TRAINERS_SUCCESS,
  PUT_TRAINERS_PENDING,
  PUT_TRAINERS_ERROR,
  RESET_ERROR_AND_MESSAGE
} from './constants';

const initialState = {
  list: [],
  isLoading: false,
  item: {},
  error: '',
  message: ''
};

const trainersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TRAINERS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };
    case GET_TRAINERS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_TRAINERS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case GET_BY_ID_TRAINERS_SUCCESS:
      return {
        ...state,
        item: action.payload,
        isLoading: false
      };
    case GET_BY_ID_TRAINERS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_BY_ID_TRAINERS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case ADD_TRAINERS_SUCCESS:
      return {
        ...state,
        item: action.payload.data,
        message: action.payload.message,
        isLoading: false
      };
    case ADD_TRAINERS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_TRAINERS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case DEL_TRAINERS_SUCCESS:
      return {
        ...state,
        item: action.payload.data,
        message: action.payload.message,
        isLoading: false
      };
    case DEL_TRAINERS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DEL_TRAINERS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case PUT_TRAINERS_SUCCESS:
      return {
        ...state,
        item: action.payload.data,
        message: action.payload.message,
        isLoading: false
      };
    case PUT_TRAINERS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case PUT_TRAINERS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case RESET_ERROR_AND_MESSAGE:
      return {
        ...state,
        error: '',
        message: ''
      };

    default:
      return state;
  }
};

export default trainersReducer;
