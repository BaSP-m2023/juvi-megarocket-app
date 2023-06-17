import {
  DEL_SUPERADMINS_ERROR,
  DEL_SUPERADMINS_PENDING,
  DEL_SUPERADMINS_SUCCESS,
  GET_SUPERADMINS_ERROR,
  GET_SUPERADMINS_PENDING,
  GET_SUPERADMINS_SUCCESS,
  ADD_SUPERADMINS_ERROR,
  ADD_SUPERADMINS_PENDING,
  ADD_SUPERADMINS_SUCCESS,
  PUT_SUPERADMINS_PENDING,
  PUT_SUPERADMINS_ERROR,
  PUT_SUPERADMINS_SUCCESS,
  GET_BY_ID_SUPERADMINS_PENDING,
  GET_BY_ID_SUPERADMINS_SUCCESS,
  GET_BY_ID_SUPERADMINS_ERROR
} from './constants';
const initialState = {
  list: [],
  isLoading: false,
  item: {},
  error: ''
};

export const SuperAdminsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUPERADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_SUPERADMINS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        item: {},
        isLoading: false
      };
    case GET_SUPERADMINS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case DEL_SUPERADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DEL_SUPERADMINS_SUCCESS:
      return {
        ...state,
        list: state.list.filter((superadmins) => superadmins._id !== action.payload),
        isLoading: false
      };
    case DEL_SUPERADMINS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case ADD_SUPERADMINS_PENDING:
      return {
        ...state
      };
    case ADD_SUPERADMINS_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        isLoading: false
      };
    case ADD_SUPERADMINS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case PUT_SUPERADMINS_PENDING:
      return {
        ...state
      };
    case PUT_SUPERADMINS_SUCCESS:
      return {
        ...state,
        list: state.list.map((superadmins) =>
          superadmins._id === action.id ? action.payload : superadmins
        ),
        isLoading: false
      };
    case PUT_SUPERADMINS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case GET_BY_ID_SUPERADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_BY_ID_SUPERADMINS_SUCCESS:
      return {
        ...state,
        item: action.payload,
        isLoading: false
      };
    case GET_BY_ID_SUPERADMINS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
