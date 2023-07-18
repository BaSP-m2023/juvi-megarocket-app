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
    const token = sessionStorage.getItem('token');
    try {
      dispatch(getSubscriptionsPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions`, {
        method: 'GET',
        headers: { token: token }
      });
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

export const getSubscriptionById = (id, setSelectedSubscription) => {
  return async (dispatch) => {
    try {
      dispatch(getByIdSubscriptionPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/${id}`);
      const responseJson = await response.json();
      const data = responseJson.data;
      if (responseJson.error) {
        throw new Error(responseJson.message);
      }
      dispatch(getByIdSubscriptionSuccess(responseJson.data));
      setSelectedSubscription({
        classes: data.classes._id,
        members: data.members[0],
        date: data.date.slice(0, 16)
      });
    } catch (error) {
      dispatch(getByIdSubscriptionError(error));
    }
  };
};

export const deleteSubscription = (id) => {
  return async (dispatch) => {
    const token = sessionStorage.getItem('token');
    try {
      dispatch(deleteSubscriptionsPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/${id}`, {
        method: 'DELETE',
        headers: { token: token }
      });
      const responseJson = await response.json();
      if (responseJson.error) {
        throw new Error(responseJson.message);
      }
      const { data, message } = responseJson;
      dispatch(deleteSubscriptionsSuccess({ data, message }));
    } catch (error) {
      dispatch(deleteSubscriptionsError(error.message));
    }
  };
};

export const addSubscription = (formData) => {
  return async (dispatch) => {
    const token = sessionStorage.getItem('token');
    dispatch(postSubscriptionsPending());
    const requestData = {
      classes: formData.classes,
      members: [formData.members],
      date: formData.date
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: token
        },
        body: JSON.stringify(requestData)
      });
      const responseData = await response.json();
      if (response.ok) {
        dispatch(postSubscriptionsSuccess(responseData.data));
      } else {
        throw new Error(responseData.message);
      }
    } catch (error) {
      dispatch(postSubscriptionsError(error));
    }
  };
};

export const editSubscription = (id, formData) => {
  return async (dispatch) => {
    const token = sessionStorage.getItem('token');
    const requestData = {
      classes: formData.classes,
      members: [formData.members._id],
      date: formData.date
    };
    try {
      dispatch(putSubscriptionsPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: token
        },
        body: JSON.stringify(requestData)
      });
      const responseData = await response.json();
      const data = responseData.data;
      if (response.ok) {
        dispatch(putSubscriptionsSuccess(data));
      } else {
        throw new Error(responseData.message);
      }
    } catch (error) {
      dispatch(putSubscriptionsError(error));
    }
  };
};
