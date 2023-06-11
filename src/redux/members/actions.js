/* eslint-disable prettier/prettier */
import { GET_MEMBERS_PENDING, GET_MEMBERS_ERROR, GET_MEMBERS_SUCCESS } from './constants';
import { GET_BY_ID_MEMBER_PENDING, GET_BY_ID_MEMBER_ERROR, GET_BY_ID_MEMBER_SUCCESS } from './constants';
import { ADD_MEMBER_PENDING, ADD_MEMBER_ERROR, ADD_MEMBER_SUCCESS } from './constants';
import { PUT_MEMBER_PENDING, PUT_MEMBER_ERROR, PUT_MEMBER_SUCCESS } from './constants';
import { DEL_MEMBER_PENDING, DEL_MEMBER_ERROR, DEL_MEMBER_SUCCESS } from './constants';

export const getMembersPending = () => ({
  type: GET_MEMBERS_PENDING
});

export const getMembersError = (error) => ({
  type: GET_MEMBERS_ERROR,
  payload: error
});

export const getMembersSuccess = (data) => ({
  type: GET_MEMBERS_SUCCESS,
  payload: data
});

export const getMemberByIdPending = () => ({
  type: GET_BY_ID_MEMBER_PENDING
});

export const getMemberByIdError = (error) => ({
  type: GET_BY_ID_MEMBER_ERROR,
  payload: error
});

export const getMemberByIdSuccess = (data) => ({
  type: GET_BY_ID_MEMBER_SUCCESS,
  payload: data
});

export const addMemberPending = () => ({
  type: ADD_MEMBER_PENDING,
});

export const addMemberError = (error) => ({
  type: ADD_MEMBER_ERROR,
  payload: error
});

export const addMemberSuccess = () => ({
  type: ADD_MEMBER_SUCCESS,
});

export const putMemberPending = () => ({
  type: PUT_MEMBER_PENDING,
});

export const putMemberError = (error) => ({
  type: PUT_MEMBER_ERROR,
  payload: error
});

export const putMemberSuccess = () => ({
  type: PUT_MEMBER_SUCCESS,
});

export const delMemberPending = () => ({
  type: DEL_MEMBER_PENDING
});

export const delMemberError = (error) => ({
  type: DEL_MEMBER_ERROR,
  payload: error
});

export const delMemberSuccess = () => ({
  type: DEL_MEMBER_SUCCESS
});
