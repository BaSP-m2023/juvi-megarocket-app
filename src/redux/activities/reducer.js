import { GET_ACTIVITIES_PENDING, GET_ACTIVITIES_ERROR, GET_ACTIVITIES_SUCCESS } from './constants';

const incialSate = {
  list: [],
  item: {},
  isLoading: false,
  error: ''
};

export const activitiesReducer = (state = incialSate, action) => {
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
    default:
      return state;
  }
};
