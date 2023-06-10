import {
  DELETE_ACTIVITY_ERROR,
  DELETE_ACTIVITY_PENDING,
  DELETE_ACTIVITY_SUCCESS,
  GET_ACTIVITIES_ERROR,
  GET_ACTIVITIES_PENDING,
  GET_ACTIVITIES_SUCCESS
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
        isLoading: false
      };
    case GET_ACTIVITIES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    // DELETE
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
    default:
      return state;
  }
};
