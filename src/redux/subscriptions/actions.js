import {
  GET_SUBSCRIPTIONS_SUCCESS,
  GET_SUBSCRIPTIONS_PENDING,
  GET_SUBSCRIPTIONS_ERROR,
  DEL_SUBSCRIPTIONS_SUCCESS,
  DEL_SUBSCRIPTIONS_PENDING,
  DEL_SUBSCRIPTIONS_ERROR,
  ADD_SUBSCRIPTIONS_SUCCESS,
  ADD_SUBSCRIPTIONS_PENDING,
  ADD_SUBSCRIPTIONS_ERROR,
  PUT_SUBSCRIPTIONS_SUCCESS,
  PUT_SUBSCRIPTIONS_PENDING,
  PUT_SUBSCRIPTIONS_ERROR,
  GET_BY_ID_SUBSCRIPTION_SUCCESS,
  GET_BY_ID_SUBSCRIPTION_PENDING,
  GET_BY_ID_SUBSCRIPTION_ERROR
} from './constants';

export const getSubscriptionsSuccess = (data) => {
  return {
    type: GET_SUBSCRIPTIONS_SUCCESS,
    payload: data
  };
};

export const getSubscriptionsPending = () => {
  return {
    type: GET_SUBSCRIPTIONS_PENDING
  };
};

export const getSubscriptionsError = (error) => {
  return {
    type: GET_SUBSCRIPTIONS_ERROR,
    payload: error
  };
};

export const deleteSubscriptionsSuccess = (data) => {
  return {
    type: DEL_SUBSCRIPTIONS_SUCCESS,
    payload: data
  };
};

export const deleteSubscriptionsPending = () => {
  return {
    type: DEL_SUBSCRIPTIONS_PENDING
  };
};

export const deleteSubscriptionsError = (error) => {
  return {
    type: DEL_SUBSCRIPTIONS_ERROR,
    payload: error
  };
};

export const postSubscriptionsSuccess = (data) => {
  return {
    type: ADD_SUBSCRIPTIONS_SUCCESS,
    payload: data
  };
};

export const postSubscriptionsPending = () => {
  return {
    type: ADD_SUBSCRIPTIONS_PENDING
  };
};

export const postSubscriptionsError = (error) => {
  return {
    type: ADD_SUBSCRIPTIONS_ERROR,
    payload: error
  };
};

export const putSubscriptionsSuccess = (data) => {
  return {
    type: PUT_SUBSCRIPTIONS_SUCCESS,
    payload: data
  };
};

export const putSubscriptionsPending = () => {
  return {
    type: PUT_SUBSCRIPTIONS_PENDING
  };
};

export const putSubscriptionsError = (error) => {
  return {
    type: PUT_SUBSCRIPTIONS_ERROR,
    payload: error
  };
};

export const getByIdSubscriptionSuccess = (data) => {
  return {
    type: GET_BY_ID_SUBSCRIPTION_SUCCESS,
    payload: data
  };
};

export const getByIdSubscriptionPending = () => {
  return {
    type: GET_BY_ID_SUBSCRIPTION_PENDING
  };
};

export const getByIdSubscriptionError = (error) => {
  return {
    type: GET_BY_ID_SUBSCRIPTION_ERROR,
    payload: error
  };
};
