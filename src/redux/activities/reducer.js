import {
  DELETE_ACTIVITY_ERROR,
  DELETE_ACTIVITY_PENDING,
  DELETE_ACTIVITY_SUCCESS,
  GET_ACTIVITIES_ERROR,
  GET_ACTIVITIES_PENDING,
  GET_ACTIVITIES_SUCCESS,
  POST_ACTIVITY_ERROR,
  POST_ACTIVITY_PENDING,
  POST_ACTIVITY_SUCCESS,
  PUT_ACTIVITY_PENDING,
  PUT_ACTIVITY_ERROR,
  PUT_ACTIVITY_SUCCESS,
  GET_BY_ID_ACITIVITY_PENDING,
  GET_BY_ID_ACITIVITY_SUCCESS,
  GET_BY_ID_ACITIVITY_ERROR
} from './constants';
const initialSate = {
  list: [],
  item: {},
  isLoading: false,
  error: ''
};

export const activitiesReducer = (state = initialSate, action) => {
  switch (action.type) {
    case GET_ACTIVITIES_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_ACTIVITIES_SUCCESS:
      return {
        ...state,
        list: action.payload,
        item: {},
        isLoading: false
      };
    case GET_ACTIVITIES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case DELETE_ACTIVITY_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_ACTIVITY_SUCCESS:
      return {
        ...state,
        list: state.list.filter((activity) => activity._id !== action.payload),
        isLoading: false
      };
    case DELETE_ACTIVITY_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case POST_ACTIVITY_PENDING:
      return {
        ...state
      };
    case POST_ACTIVITY_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        isLoading: false
      };
    case POST_ACTIVITY_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case PUT_ACTIVITY_PENDING:
      return {
        ...state
      };
    case PUT_ACTIVITY_SUCCESS:
      return {
        ...state,
        list: state.list.map((activity) =>
          activity._id === action.id ? action.payload : activity
        ),
        isLoading: false
      };
    case PUT_ACTIVITY_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case GET_BY_ID_ACITIVITY_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_BY_ID_ACITIVITY_SUCCESS:
      return {
        ...state,
        item: action.payload,
        isLoading: false
      };
    case GET_BY_ID_ACITIVITY_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
