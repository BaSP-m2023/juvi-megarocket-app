import {
  getTrainersPending,
  getTrainersSuccess,
  getTrainersError,
  getTrainerByIdPending,
  getTrainerByIdSuccess,
  getTrainerByIdError,
  delTrainerPending,
  delTrainerSuccess,
  delTrainerError,
  addTrainerPending,
  addTrainerSuccess,
  addTrainerError,
  putTrainerError,
  putTrainerSuccess,
  putTrainerPending
} from './actions';

export const getTrainers = () => {
  return async (dispatch) => {
    try {
      dispatch(getTrainersPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer`);
      const responseJson = await response.json();
      if (responseJson.error) {
        throw new Error(responseJson.message);
      }
      dispatch(getTrainersSuccess(responseJson.data));
    } catch (error) {
      dispatch(getTrainersError(error));
    }
  };
};

export const getTrainersBy = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getTrainerByIdPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer/${id}`);
      const responseJson = await response.json();
      if (responseJson.error) {
        throw new Error(responseJson.message);
      }
      dispatch(getTrainerByIdSuccess(responseJson.data));
    } catch (error) {
      dispatch(getTrainerByIdError(error));
    }
  };
};
export const delTrainer = (id) => {
  return async (dispatch) => {
    try {
      dispatch(delTrainerPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer/${id}`, {
        method: 'DELETE'
      });
      const responseJson = await response.json();
      if (response.error) {
        throw new Error(responseJson.message);
      }
      const { data, message } = responseJson;
      dispatch(delTrainerSuccess({ data, message }));
    } catch (error) {
      dispatch(delTrainerError(error.message));
    }
  };
};
export const addTrainer = (request) => {
  return async (dispatch) => {
    try {
      dispatch(addTrainerPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      });
      const responseJson = await response.json();
      if (responseJson.error) {
        if (responseJson.message.errors) {
          throw new Error(responseJson.message.message);
        }
        throw new Error(responseJson.message);
      } else {
        const { data, message } = responseJson;
        dispatch(addTrainerSuccess({ data, message }));
      }
    } catch (error) {
      if (error.message.length > 70) {
        dispatch(
          addTrainerError(
            error.message.substring(26, 32) +
              error.message.substring(error.message.length - 48, error.message.length)
          )
        );
      } else {
        dispatch(addTrainerError(error.message));
      }
    }
  };
};
export const putTrainer = (request, id) => {
  return async (dispatch) => {
    try {
      dispatch(putTrainerPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      });
      const responseJson = await response.json();
      if (responseJson.error) {
        throw new Error(responseJson.message);
      }
      const { data, message } = responseJson;
      dispatch(putTrainerSuccess({ data, message }));
    } catch (error) {
      dispatch(putTrainerError(error.message));
    }
  };
};
