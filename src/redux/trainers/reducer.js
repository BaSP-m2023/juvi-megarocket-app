import { FETCH_TRAINERS, ADD_TRAINER, REMOVE_TRAINER, EDIT_TRAINER } from './constants';

const initialState = {
  trainers: []
};

const trainerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TRAINERS:
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
        trainers: state.trainers.filter((trainer) => trainer.id !== action.payload)
      };
    case EDIT_TRAINER:
      return {
        ...state,
        trainers: state.trainers.map((trainer) =>
          trainer.id === action.payload.id ? action.payload : trainer
        )
      };
    default:
      return state;
  }
};

export default trainerReducer;
