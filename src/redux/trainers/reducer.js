import {
  GET_TRAINERS_PENDING,
  GET_TRAINERS_SUCCESS,
  GET_TRAINERS_ERROR,
  GET_TRAINERS_BY_PENDING,
  GET_TRAINERS_BY_SUCCESS,
  GET_TRAINERS_BY_ERROR,
  DEL_TRAINERS_PENDING,
  DEL_TRAINERS_SUCCESS,
  DEL_TRAINERS_ERROR
} from './constants';

const initialState = {
  list: [],
  isLoading: false,
  item: {},
  error: '',
  message: ''
};

const trainerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TRAINERS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_TRAINERS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };
    case GET_TRAINERS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case GET_TRAINERS_BY_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_TRAINERS_BY_SUCCESS:
      return {
        ...state,
        item: action.payload,
        isLoading: false
      };

    case GET_TRAINERS_BY_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case DEL_TRAINERS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DEL_TRAINERS_SUCCESS:
      console.log(action);
      return {
        ...state,
        item: action.payload.data,
        message: action.payload.message,
        isLoading: false
      };
    case DEL_TRAINERS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    default:
      return state;

    /* case FETCH_TRAINERS:
      return {
        ...state,
        trainers: action.payload
      };
    case ADD_TRAINER:
      return {
        ...state,
        trainers: [...state.trainers, action.payload]
      };
    case REMOVE_TRAINER:
      return {
        ...state,
        trainers: state.trainers.filter((trainer) => trainer._id !== action.payload)
      };
    case EDIT_TRAINER:
      return {
        ...state,
        trainers: state.trainers.map((trainer) =>
          trainer._id === action.payload.id ? action.payload : trainer
        )
      };*/
  }
};

export default trainerReducer;
