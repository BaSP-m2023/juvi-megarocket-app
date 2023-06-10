import { GET_CLASSES_PENDING, GET_CLASSES_SUCCESS, GET_CLASSES_ERROR } from './constants';

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
    default:
      return state;
  }
};
