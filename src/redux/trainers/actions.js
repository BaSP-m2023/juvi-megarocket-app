import {
  GET_TRAINERS_PENDING,
  GET_TRAINERS_SUCCESS,
  GET_TRAINERS_ERROR,
  GET_TRAINERS_BY_PENDING,
  GET_TRAINERS_BY_SUCCESS,
  GET_TRAINERS_BY_ERROR,
  DEL_TRAINERS_PENDING,
  DEL_TRAINERS_SUCCESS,
  DEL_TRAINERS_ERROR,
  ADD_TRAINERS_PENDING,
  ADD_TRAINERS_SUCCESS,
  ADD_TRAINERS_ERROR,
  PUT_TRAINERS_PENDING,
  PUT_TRAINERS_SUCCESS,
  PUT_TRAINERS_ERROR,
  RESET_ERROR_AND_MESSAGE
} from './constants';

export const getTrainersPending = () => {
  return {
    type: GET_TRAINERS_PENDING
  };
};
export const getTrainersSuccess = (data) => {
  return {
    type: GET_TRAINERS_SUCCESS,
    payload: data
  };
};
export const getTrainersError = (error) => {
  return {
    type: GET_TRAINERS_ERROR,
    payload: error
  };
};

export const getTrainerByIdPending = () => {
  return {
    type: GET_TRAINERS_BY_PENDING
  };
};
export const getTrainerByIdSuccess = (data) => {
  return {
    type: GET_TRAINERS_BY_SUCCESS,
    payload: data
  };
};
export const getTrainerByIdError = (error) => {
  return {
    type: GET_TRAINERS_BY_ERROR,
    payload: error
  };
};

export const delTrainerPending = () => {
  return {
    type: DEL_TRAINERS_PENDING
  };
};
export const delTrainerSuccess = (data) => {
  return {
    type: DEL_TRAINERS_SUCCESS,
    payload: data
  };
};
export const delTrainerError = (error) => {
  return {
    type: DEL_TRAINERS_ERROR,
    payload: error
  };
};

export const addTrainerPending = () => {
  return {
    type: ADD_TRAINERS_PENDING
  };
};
export const addTrainerSuccess = (data) => {
  return {
    type: ADD_TRAINERS_SUCCESS,
    payload: data
  };
};
export const addTrainerError = (error) => {
  return {
    type: ADD_TRAINERS_ERROR,
    payload: error
  };
};
export const putTrainerPending = () => {
  return {
    type: PUT_TRAINERS_PENDING
  };
};
export const putTrainerSuccess = (data) => {
  return {
    type: PUT_TRAINERS_SUCCESS,
    payload: data
  };
};
export const puitTrainerError = (error) => {
  return {
    type: PUT_TRAINERS_ERROR,
    payload: error
  };
};
export const resetErrorAndMessage = () => {
  return {
    type: RESET_ERROR_AND_MESSAGE
  };
};
