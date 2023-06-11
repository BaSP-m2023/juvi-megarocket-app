import {
  GET_CLASSES_PENDING,
  GET_CLASSES_SUCCESS,
  GET_CLASSES_ERROR,
  DEL_CLASSES_PENDING,
  DEL_CLASSES_SUCCESS,
  DEL_CLASSES_ERROR,
  ADD_CLASSES_PENDING,
  ADD_CLASSES_SUCCESS,
  ADD_CLASSES_ERROR,
  PUT_CLASSES_PENDING,
  PUT_CLASSES_SUCCESS,
  PUT_CLASSES_ERROR,
  GET_BY_ID_CLASSES_PENDING,
  GET_BY_ID_CLASSES_SUCCESS,
  GET_BY_ID_CLASSES_ERROR
} from './constants';

export const getClassesPending = () => {
  return {
    type: GET_CLASSES_PENDING
  };
};

export const getClassesSuccess = (data) => {
  return {
    type: GET_CLASSES_SUCCESS,
    payload: data
  };
};

export const getClassesError = (error) => {
  return {
    type: GET_CLASSES_ERROR,
    payload: error
  };
};

export const deleteClassPending = () => {
  return {
    type: DEL_CLASSES_PENDING
  };
};

export const deleteClassSuccess = (_id) => {
  return {
    type: DEL_CLASSES_SUCCESS,
    payload: _id
  };
};

export const deleteClassError = (error) => {
  return {
    type: DEL_CLASSES_ERROR,
    payload: error
  };
};

export const postClassPending = () => {
  return {
    type: ADD_CLASSES_PENDING
  };
};

export const postClassSuccess = (aClass) => {
  return {
    type: ADD_CLASSES_SUCCESS,
    payload: aClass
  };
};

export const postClassError = (error) => {
  return {
    type: ADD_CLASSES_ERROR,
    payload: error
  };
};

export const putClassPending = () => {
  return {
    type: PUT_CLASSES_PENDING
  };
};

export const putClassSuccess = (data) => {
  return {
    type: PUT_CLASSES_SUCCESS,
    payload: data
  };
};

export const putClassError = (error) => {
  return {
    type: PUT_CLASSES_ERROR,
    payload: error
  };
};

export const getByIdClassPending = () => {
  return {
    type: GET_BY_ID_CLASSES_PENDING
  };
};

export const getByIdClassSuccess = (data) => {
  return {
    type: GET_BY_ID_CLASSES_SUCCESS,
    payload: data
  };
};

export const getByIdClassError = (error) => {
  return {
    type: GET_BY_ID_CLASSES_ERROR,
    payload: error
  };
};
