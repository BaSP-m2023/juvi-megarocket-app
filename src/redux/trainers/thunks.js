import { FETCH_TRAINERS, ADD_TRAINER, REMOVE_TRAINER, EDIT_TRAINER } from './constants';

export const fetchTrainersAsync = (setModalText) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers`);
      if (!response.ok) {
        throw new Error('Failed to fetch trainers.');
      }
      const jsonData = await response.json();
      const trainerData = jsonData.data;

      dispatch({
        type: FETCH_TRAINERS,
        payload: trainerData
      });
    } catch (error) {
      setModalText(`Error getting trainers: ${error}`);
    }
  };
};

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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers/${trainerId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete trainer.');
      }

      dispatch({
        type: REMOVE_TRAINER,
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
