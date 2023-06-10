import {
  getTrainersPending,
  getTrainersSuccess,
  getTrainersError,
  delTrainerPending,
  delTrainerSuccess,
  delTrainerError
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
      dispatch(delTrainerError(error));
    }
  };
};
/*
export const addTrainerAsync = (trainerData, setModalText) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(trainerData)
      });
      if (!response.ok) {
        throw new Error('Failed to add trainer.');
      }
      const jsonData = await response.json();
      const newTrainer = jsonData.data;

      dispatch({
        type: ADD_TRAINER,
        payload: newTrainer
      });
    } catch (error) {
      setModalText(`Error adding Trainer: ${error}`);
    }
  };
};

export const removeTrainerAsync = (trainerId, setModalText, setIsModalOpen) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer/${trainerId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete trainer.');
      }
      dispatch({
        payload: trainerId
      });
    } catch (error) {
      setModalText(`Error deleting Trainer: ${error}`);
      setIsModalOpen(true);
    }
  };
};

export const editTrainerAsync = (trainerData, trainerId, setModalText) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers/${trainerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(trainerData)
      });
      if (!response.ok) {
        throw new Error('Failed to edit trainer.');
      }
      const jsonData = await response.json();
      const editedTrainer = jsonData.data;

      dispatch({
        type: EDIT_TRAINER,
        payload: editedTrainer
      });
    } catch (error) {
      setModalText(`Error editing Trainer: ${error}`);
    }
  };
};
*/
