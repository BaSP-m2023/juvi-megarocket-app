import { GET_ACTIVITIES_PENDING, GET_ACTIVITIES_ERROR, GET_ACTIVITIES_SUCCESS } from './constants';
import { PUT_ACTIVITY_ERROR, PUT_ACTIVITY_SUCCESS, PUT_ACTIVITY_PENDING } from './constants';
import {
  DELETE_ACTIVITY_ERROR,
  DELETE_ACTIVITY_PENDING,
  DELETE_ACTIVITY_SUCCESS
} from './constants';
import { POST_ACTIVITY_ERROR, POST_ACTIVITY_PENDING, POST_ACTIVITY_SUCCESS } from './constants';

// ACA VA EL GET
export const getActivitiesPending = () => {
  return {
    type: GET_ACTIVITIES_PENDING
  };
};

export const getActivitiesSuccess = (data) => {
  return {
    type: GET_ACTIVITIES_SUCCESS,
    payload: data
  };
};

export const getActivitiesError = (error) => {
  return {
    type: GET_ACTIVITIES_ERROR,
    payload: error
  };
};

// ACÁ COMIENZA EL PUT.
export const putActivitiesPending = () => {
  return {
    type: PUT_ACTIVITY_PENDING
  };
};

export const putActivitiesSuccess = (updatedActivity, id) => {
  return {
    type: PUT_ACTIVITY_SUCCESS,
    payload: updatedActivity,
    id
  };
};
export const putActivitiesError = (error) => {
  return {
    type: PUT_ACTIVITY_ERROR,
    payload: error
  };
};

// ACÁ COMIENZA EL DELETE.
export const deleteActivityPending = () => {
  return {
    type: DELETE_ACTIVITY_PENDING
  };
};

export const deleteActivitySuccess = (_id) => {
  return {
    type: DELETE_ACTIVITY_SUCCESS,
    payload: _id
  };
};
export const deleteActivityError = (error) => {
  return {
    type: DELETE_ACTIVITY_ERROR,
    payload: error
  };
};

// ACÁ COMIENZA EL POST
export const postActivitiesPending = () => {
  return {
    type: POST_ACTIVITY_PENDING
  };
};
export const postActivitiesSuccess = (newActivity) => {
  return {
    type: POST_ACTIVITY_SUCCESS,
    payload: newActivity
  };
};
export const postActivitiesError = (error) => {
  return {
    type: POST_ACTIVITY_ERROR,
    payload: error
  };
};
