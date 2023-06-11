/* eslint-disable prettier/prettier */
import { GET_MEMBERS_PENDING, GET_MEMBERS_ERROR, GET_MEMBERS_SUCCESS } from './constants';
import { GET_BY_ID_MEMBER_PENDING, GET_BY_ID_MEMBER_ERROR, GET_BY_ID_MEMBER_SUCCESS } from './constants';
import { ADD_MEMBER_PENDING, ADD_MEMBER_ERROR, ADD_MEMBER_SUCCESS } from './constants';
import { PUT_MEMBER_PENDING, PUT_MEMBER_ERROR, PUT_MEMBER_SUCCESS } from './constants';
import { DEL_MEMBER_PENDING, DEL_MEMBER_ERROR, DEL_MEMBER_SUCCESS } from './constants';

const initialState = {
  list: [],
  item: {},
  isLoading: false,
  error: ''
};

export const membersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MEMBERS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_MEMBERS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case GET_MEMBERS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        error: '',
        isLoading: false
      };
    case GET_BY_ID_MEMBER_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_BY_ID_MEMBER_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case GET_BY_ID_MEMBER_SUCCESS:
      return {
        ...state,
        item: action.payload,
        error: '',
        isLoading: false
      };
    case ADD_MEMBER_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_MEMBER_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case ADD_MEMBER_SUCCESS:
      return {
        ...state,
        error: '',
        isLoading: false
      };
    case PUT_MEMBER_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case PUT_MEMBER_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case PUT_MEMBER_SUCCESS:
      return {
        ...state,
        error: '',
        isLoading: false
      };
    case DEL_MEMBER_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DEL_MEMBER_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case DEL_MEMBER_SUCCESS:
      return {
        ...state,
        error: '',
        isLoading: false
      };
    default:
      return state;
  }
};
