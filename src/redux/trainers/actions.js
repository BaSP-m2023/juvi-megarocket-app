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
    type: GET_TRAINERS_BY_ERROR
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
    type: GET_TRAINERS_BY_PENDING,
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
