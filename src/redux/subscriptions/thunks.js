import {
  getSubscriptionsError,
  getSubscriptionsPending,
  getSubscriptionsSuccess,
  deleteSubscriptionsError,
  deleteSubscriptionsSuccess,
  deleteSubscriptionsPending,
  postSubscriptionsError,
  postSubscriptionsPending,
  postSubscriptionsSuccess,
  putSubscriptionsError,
  putSubscriptionsSuccess,
  putSubscriptionsPending,
  getByIdSubscriptionError,
  getByIdSubscriptionSuccess,
  getByIdSubscriptionPending
} from './actions';

export const getSubscriptions = () => {
  return async (dispatch) => {
    try {
      dispatch(getSubscriptionsPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions`);
      const responseJson = await response.json();
      if (responseJson.error) {
        throw new Error(responseJson.message);
      }
      dispatch(getSubscriptionsSuccess(responseJson.data));
    } catch (error) {
      dispatch(getSubscriptionsError(error));
    }
  };
};

export const getSubscriptionsById = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getByIdSubscriptionPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions${id}`);
      const responseJson = await response.json();
      if (responseJson.error) {
        throw new Error(responseJson.message);
      }
      dispatch(getByIdSubscriptionSuccess(responseJson.data));
    } catch (error) {
      dispatch(getByIdSubscriptionError(error));
    }
  };
};

export const deleteSubscription = (id, setAlertText) => {
  return async (dispatch) => {
    try {
      dispatch(deleteSubscriptionsPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscription/${id}`, {
        method: 'DELETE'
      });
      const responseJson = await response.json();
      if (responseJson.error) {
        throw new Error(responseJson.message);
      }
      const { data, message } = responseJson;
      dispatch(deleteSubscriptionsSuccess({ data, message }));
      setAlertText(responseJson.message);
    } catch (error) {
      dispatch(deleteSubscriptionsError(error.message));
      setAlertText(error);
    }
  };
};

export const addSubscription = (formData) => {
  return async (dispatch) => {
    try {
      dispatch(postSubscriptionsPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const responseJson = await response.json();
      if (responseJson.error) {
        throw new Error(responseJson.error);
      }
      dispatch(postSubscriptionsSuccess(responseJson.data));
    } catch (error) {
      dispatch(postSubscriptionsError(error));
    }
  };
};

export const editSubscription = (id, formData) => {
  return async (dispatch) => {
    try {
      dispatch(putSubscriptionsPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const responseJson = await response.json();
      if (responseJson.error) {
        throw new Error(responseJson.message);
      }
      dispatch(putSubscriptionsSuccess(responseJson.data));
    } catch (error) {
      dispatch(putSubscriptionsError(error));
    }
  };
};
