import {
  GET_ACTIVITIES_PENDING,
  GET_ACTIVITIES_ERROR,
  GET_ACTIVITIES_SUCCESS,
  PUT_ACTIVITY_ERROR,
  PUT_ACTIVITY_SUCCESS,
  PUT_ACTIVITY_PENDING,
  DEL_ACTIVITY_ERROR,
  DEL_ACTIVITY_PENDING,
  DEL_ACTIVITY_SUCCESS,
  ADD_ACTIVITY_ERROR,
  ADD_ACTIVITY_PENDING,
  ADD_ACTIVITY_SUCCESS,
  GET_BY_ID_ACITIVITY_SUCCESS,
  GET_BY_ID_ACITIVITY_PENDING,
  GET_BY_ID_ACITIVITY_ERROR
} from './constants';

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

export const deleteActivityPending = () => {
  return {
    type: DEL_ACTIVITY_PENDING
  };
};

export const deleteActivitySuccess = (_id) => {
  return {
    type: DEL_ACTIVITY_SUCCESS,
    payload: _id
  };
};
export const deleteActivityError = (error) => {
  return {
    type: DEL_ACTIVITY_ERROR,
    payload: error
  };
};

export const postActivitiesPending = () => {
  return {
    type: ADD_ACTIVITY_PENDING
  };
};
export const postActivitiesSuccess = (newActivity) => {
  return {
    type: ADD_ACTIVITY_SUCCESS,
    payload: newActivity
  };
};
export const postActivitiesError = (error) => {
  return {
    type: ADD_ACTIVITY_ERROR,
    payload: error
  };
};

export const getByIdActivityPending = () => {
  return {
    type: GET_BY_ID_ACITIVITY_PENDING
  };
};
export const getByIdActivitySuccess = (data) => {
  return {
    type: GET_BY_ID_ACITIVITY_SUCCESS,
    payload: data
  };
};
export const getByIdActivityError = (error) => {
  return {
    type: GET_BY_ID_ACITIVITY_ERROR,
    payload: error
  };
};
