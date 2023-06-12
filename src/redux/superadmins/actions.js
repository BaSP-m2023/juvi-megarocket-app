import {
  GET_SUPERADMIN_PENDING,
  GET_SUPERADMIN_ERROR,
  GET_SUPERADMIN_SUCCESS,
  PUT_SUPERADMIN_ERROR,
  PUT_SUPERADMIN_SUCCESS,
  PUT_SUPERADMIN_PENDING,
  DEL_SUPERADMIN_ERROR,
  DEL_SUPERADMIN_PENDING,
  DEL_SUPERADMIN_SUCCESS,
  ADD_SUPERADMIN_ERROR,
  ADD_SUPERADMIN_PENDING,
  ADD_SUPERADMIN_SUCCESS,
  GET_BY_ID_SUPERADMIN_SUCCESS,
  GET_BY_ID_SUPERADMIN_PENDING,
  GET_BY_ID_SUPERADMIN_ERROR
} from './constants';

export const getSuperAdminPending = () => {
  return {
    type: GET_SUPERADMIN_PENDING
  };
};

export const getSuperAdminSuccess = (data) => {
  return {
    type: GET_SUPERADMIN_SUCCESS,
    payload: data
  };
};

export const getSuperAdminError = (error) => {
  return {
    type: GET_SUPERADMIN_ERROR,
    payload: error
  };
};

export const putSuperAdminPending = () => {
  return {
    type: PUT_SUPERADMIN_PENDING
  };
};

export const putSuperAdminSuccess = (updatedActivity, id) => {
  return {
    type: PUT_SUPERADMIN_SUCCESS,
    payload: updatedActivity,
    id
  };
};
export const putSuperAdminError = (error) => {
  return {
    type: PUT_SUPERADMIN_ERROR,
    payload: error
  };
};

export const deleteSuperAdminPending = () => {
  return {
    type: DEL_SUPERADMIN_PENDING
  };
};

export const deleteSuperAdminSuccess = (_id) => {
  return {
    type: DEL_SUPERADMIN_SUCCESS,
    payload: _id
  };
};
export const deleteSuperAdminError = (error) => {
  return {
    type: DEL_SUPERADMIN_ERROR,
    payload: error
  };
};

export const postSuperAdminPending = () => {
  return {
    type: ADD_SUPERADMIN_PENDING
  };
};
export const postSuperAdminSuccess = (newActivity) => {
  return {
    type: ADD_SUPERADMIN_SUCCESS,
    payload: newActivity
  };
};
export const postSuperAdminError = (error) => {
  return {
    type: ADD_SUPERADMIN_ERROR,
    payload: error
  };
};

export const getByIdSuperAdminPending = () => {
  return {
    type: GET_BY_ID_SUPERADMIN_PENDING
  };
};
export const getByIdSuperAdminSuccess = (data) => {
  return {
    type: GET_BY_ID_SUPERADMIN_SUCCESS,
    payload: data
  };
};
export const getByIdSuperAdminError = (error) => {
  return {
    type: GET_BY_ID_SUPERADMIN_ERROR,
    payload: error
  };
};
