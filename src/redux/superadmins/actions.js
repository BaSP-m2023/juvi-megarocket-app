import {
  GET_SUPERADMINS_PENDING,
  GET_SUPERADMINS_ERROR,
  GET_SUPERADMINS_SUCCESS,
  PUT_SUPERADMINS_ERROR,
  PUT_SUPERADMINS_SUCCESS,
  PUT_SUPERADMINS_PENDING,
  DEL_SUPERADMINS_ERROR,
  DEL_SUPERADMINS_PENDING,
  DEL_SUPERADMINS_SUCCESS,
  ADD_SUPERADMINS_ERROR,
  ADD_SUPERADMINS_PENDING,
  ADD_SUPERADMINS_SUCCESS,
  GET_BY_ID_SUPERADMINS_SUCCESS,
  GET_BY_ID_SUPERADMINS_PENDING,
  GET_BY_ID_SUPERADMINS_ERROR
} from './constants';

export const getSuperAdminsSuccess = (data) => {
  return {
    type: GET_SUPERADMINS_SUCCESS,
    payload: data
  };
};

export const getSuperAdminsPending = () => {
  return {
    type: GET_SUPERADMINS_PENDING
  };
};

export const getSuperAdminsError = (error) => {
  return {
    type: GET_SUPERADMINS_ERROR,
    payload: error
  };
};

export const putSuperAdminsPending = () => {
  return {
    type: PUT_SUPERADMINS_PENDING
  };
};

export const putSuperAdminsSuccess = (updatedSuperAdmins, id) => {
  return {
    type: PUT_SUPERADMINS_SUCCESS,
    payload: updatedSuperAdmins,
    id
  };
};
export const putSuperAdminsError = (error) => {
  return {
    type: PUT_SUPERADMINS_ERROR,
    payload: error
  };
};

export const deleteSuperAdminsPending = () => {
  return {
    type: DEL_SUPERADMINS_PENDING
  };
};

export const deleteSuperAdminsSuccess = (_id) => {
  return {
    type: DEL_SUPERADMINS_SUCCESS,
    payload: _id
  };
};
export const deleteSuperAdminsError = (error) => {
  return {
    type: DEL_SUPERADMINS_ERROR,
    payload: error
  };
};

export const postSuperAdminsPending = () => {
  return {
    type: ADD_SUPERADMINS_PENDING
  };
};
export const postSuperAdminsSuccess = (SuperAdmins) => {
  return {
    type: ADD_SUPERADMINS_SUCCESS,
    payload: SuperAdmins
  };
};
export const postSuperAdminsError = (error) => {
  return {
    type: ADD_SUPERADMINS_ERROR,
    payload: error
  };
};

export const getByIdSuperAdminsPending = () => {
  return {
    type: GET_BY_ID_SUPERADMINS_PENDING
  };
};
export const getByIdSuperAdminsSuccess = (data) => {
  return {
    type: GET_BY_ID_SUPERADMINS_SUCCESS,
    payload: data
  };
};
export const getByIdSuperAdminsError = (error) => {
  return {
    type: GET_BY_ID_SUPERADMINS_ERROR,
    payload: error
  };
};
