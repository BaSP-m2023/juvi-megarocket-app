import {
  GET_SUBSCRIPTIONS_SUCCESS,
  GET_SUBSCRIPTIONS_PENDING,
  GET_SUBSCRIPTIONS_ERROR,
  DEL_SUBSCRIPTIONS_SUCCESS,
  DEL_SUBSCRIPTIONS_PENDING,
  DEL_SUBSCRIPTIONS_ERROR,
  ADD_SUBSCRIPTIONS_SUCCESS,
  ADD_SUBSCRIPTIONS_PENDING,
  ADD_SUBSCRIPTIONS_ERROR,
  PUT_SUBSCRIPTIONS_SUCCESS,
  PUT_SUBSCRIPTIONS_PENDING,
  PUT_SUBSCRIPTIONS_ERROR,
  GET_BY_ID_SUBSCRIPTION_SUCCESS,
  GET_BY_ID_SUBSCRIPTION_PENDING,
  GET_BY_ID_SUBSCRIPTION_ERROR
} from './constants';

const initialSate = {
  list: [],
  item: {},
  isLoading: false,
  error: ''
};

export const subscriptionsReducer = (state = initialSate, action) => {
  switch (action.type) {
    case GET_SUBSCRIPTIONS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        item: {},
        isLoading: false
      };
    case GET_SUBSCRIPTIONS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case DEL_SUBSCRIPTIONS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DEL_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        item: action.payload.data,
        message: action.payload.message,
        isLoading: false
      };
    case DEL_SUBSCRIPTIONS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case ADD_SUBSCRIPTIONS_PENDING:
      return {
        ...state
      };
    case ADD_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        item: action.payload.data,
        message: action.payload.message,
        isLoading: false
      };
    case ADD_SUBSCRIPTIONS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case PUT_SUBSCRIPTIONS_PENDING:
      return {
        ...state
      };
    case PUT_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        item: action.payload.data,
        message: action.payload.message,
        isLoading: false
      };
    case PUT_SUBSCRIPTIONS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case GET_BY_ID_SUBSCRIPTION_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_BY_ID_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        item: action.payload,
        isLoading: false
      };
    case GET_BY_ID_SUBSCRIPTION_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
