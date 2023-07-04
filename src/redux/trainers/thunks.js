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
    const token = sessionStorage.getItem('token');
    try {
      dispatch(getTrainersPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer`, {
        method: 'GET',
        headers: { token: token }
      });
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
    const token = sessionStorage.getItem('token');
    try {
      dispatch(delTrainerPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer/${id}`, {
        method: 'DELETE',
        headers: { token: token }
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
export const addTrainer = (data, setModalText, setShowModal, setShowModalSuccess) => {
  return async (dispatch) => {
    const token = sessionStorage.getItem('token');
    try {
      dispatch(addTrainerPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: token
        },
        body: JSON.stringify(data)
      });
      const responseJson = await response.json();
      if (responseJson.error) {
        throw new Error(responseJson.message);
      } else {
        const { data, message } = responseJson;
        setShowModalSuccess(true);
        setModalText(message);
        dispatch(addTrainerSuccess({ data, message }));
      }
    } catch (error) {
      setShowModal(true);
      setModalText(error);
      dispatch(addTrainerError(error.message));
    }
  };
};
export const putTrainer = (data, id, setModalText, setShowModal, setShowModalSuccess) => {
  return async (dispatch) => {
    const token = sessionStorage.getItem('token');
    try {
      dispatch(putTrainerPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: token
        },
        body: JSON.stringify(data)
      });
      const responseJson = await response.json();
      if (responseJson.error) {
        throw new Error(responseJson.message);
      } else {
        const { data, message } = responseJson;
        setShowModalSuccess(true);
        setModalText(message);
        dispatch(putTrainerSuccess({ data, message }));
      }
    } catch (error) {
      setShowModal(true);
      setModalText(error);
      dispatch(putTrainerError(error.message));
    }
  };
};
