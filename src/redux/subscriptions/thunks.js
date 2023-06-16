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

export const deleteSubscription = (id, setAlertText, setShowAlert) => {
  return async (dispatch) => {
    try {
      dispatch(deleteSubscriptionsPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/${id}`, {
        method: 'DELETE'
      });
      const responseJson = await response.json();
      if (responseJson.error) {
        throw new Error(responseJson.message);
      }
      const { data, message } = responseJson;
      dispatch(deleteSubscriptionsSuccess({ data, message }));
      setShowAlert(true);
      setAlertText(responseJson.message);
    } catch (error) {
      dispatch(deleteSubscriptionsError(error.message));
      setAlertText(error);
      setShowAlert(true);
    }
  };
};

export const addSubscription = (
  formData,
  setAlertText,
  showAlertHandler,
  setSuccess,
  getClasses
) => {
  return async (dispatch) => {
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
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
      const responseData = await response.json();
      if (responseData.error) {
        setAlertText(responseData.message);
      } else {
        dispatch(postSubscriptionsSuccess(responseData.data));
        setAlertText(responseData.message);
        showAlertHandler();
        setSuccess(true);
        getClasses();
      }
    } catch (error) {
      dispatch(postSubscriptionsError(error));
      setAlertText(error);
      showAlertHandler();
    }
  };
};

export const editSubscription = (
  id,
  formData,
  setAlertText,
  setShowAlert,
  getClasses,
  memberId,
  classId
) => {
  return async (dispatch) => {
    const requestData = {
      classes: formData.classes,
      members: [formData.members],
      date: formData.date
    };
    try {
      dispatch(putSubscriptionsPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
      const responseData = await response.json();
      const data = responseData.data;
      console.log(data);
      if (response.ok) {
        if (data.members === memberId && data.classes === classId) {
          setAlertText('No change has been made');
          setShowAlert(true);
        }
        dispatch(putSubscriptionsSuccess(data));
        setAlertText(responseData.message);
        setShowAlert(true);
        getClasses();
      } else {
        setAlertText(responseData.message);
      }
    } catch (error) {
      dispatch(putSubscriptionsError(error));
      setAlertText(error.message);
      setShowAlert(true);
    }
  };
};
