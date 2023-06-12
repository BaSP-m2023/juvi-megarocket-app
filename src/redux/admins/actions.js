import {
  GET_ADMIN_SUCCESS,
  GET_ADMIN_PENDING,
  GET_ADMIN_ERROR,
  ADD_ADMIN_SUCCESS,
  ADD_ADMIN_PENDING,
  ADD_ADMIN_ERROR,
  DEL_ADMIN_SUCCESS,
  DEL_ADMIN_PENDING,
  DEL_ADMIN_ERROR,
  PUT_ADMIN_SUCCESS,
  PUT_ADMIN_PENDING,
  PUT_ADMIN_ERROR
} from './constants';

export const getAdminsPending = () => {
  return {
    type: GET_ADMIN_PENDING
  };
};
export const getAdminsSuccess = (data) => {
  console.log('asdasd');
  return {
    type: GET_ADMIN_SUCCESS,
    payload: data
  };
};

export const getAdminError = (error) => {
  console.log(error);
  return {
    type: GET_ADMIN_ERROR,
    payload: error
  };
};

/* export const getAdminsByIdPending = () => {
  return {
    type: GET_BY_ID_ADMIN_PENDING
  };
};
export const getAdminsByIdSucess = (data) => {
  return {
    type: GET_BY_ID_ADMIN_SUCCESS,
    payload: data
  };
};
export const getAdminsByIdError = (error) => {
  return {
    type: GET_BY_ID_ADMIN_ERROR,
    payload: error
  };
}; */
export const addAdminsPending = () => {
  return {
    type: ADD_ADMIN_PENDING
  };
};
export const addAdminsSuccess = (data) => {
  return {
    type: ADD_ADMIN_SUCCESS,
    payload: data
  };
};
export const addAdminsError = (error) => {
  return {
    type: ADD_ADMIN_ERROR,
    payload: error
  };
};

export const deleteAdminsPending = () => {
  return {
    type: DEL_ADMIN_PENDING
  };
};
export const deleteAdminsSuccess = (data) => {
  return {
    type: DEL_ADMIN_SUCCESS,
    payload: data
  };
};
export const deleteAdminsError = (error) => {
  return {
    type: DEL_ADMIN_ERROR,
    payload: error
  };
};

export const putAdminsPending = () => {
  return {
    type: PUT_ADMIN_PENDING
  };
};
export const putAdminsSuccess = (data) => {
  return {
    type: PUT_ADMIN_SUCCESS,
    payload: data
  };
};
export const putAdminsError = (error) => {
  return {
    type: PUT_ADMIN_ERROR,
    payload: error
  };
};
/* export const removeAdmin = (adminId) => ({
  type: REMOVE_ADMIN,
  payload: adminId
});

export const editAdmin = (adminData) => ({
  type: EDIT_ADMIN,
  payload: adminData
});
 */
