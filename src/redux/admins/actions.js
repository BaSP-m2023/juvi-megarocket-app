import { FETCH_ADMINS, ADD_ADMIN, REMOVE_ADMIN, EDIT_ADMIN } from './constants';

export const fetchAdmins = () => ({
  type: FETCH_ADMINS
});

export const addAdmin = (adminData) => ({
  type: ADD_ADMIN,
  payload: adminData
});

export const removeAdmin = (adminId) => ({
  type: REMOVE_ADMIN,
  payload: adminId
});

export const editAdmin = (adminData) => ({
  type: EDIT_ADMIN,
  payload: adminData
});
