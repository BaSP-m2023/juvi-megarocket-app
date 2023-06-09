import { FETCH_TRAINERS, ADD_TRAINER, REMOVE_TRAINER, EDIT_TRAINER } from './constants';

export const fetchTrainers = () => ({
  type: FETCH_TRAINERS
});

export const addTrainer = (trainerData) => ({
  type: ADD_TRAINER,
  payload: trainerData
});

export const removeTrainer = (trainerId) => ({
  type: REMOVE_TRAINER,
  payload: trainerId
});

export const editTrainer = (trainerData) => ({
  type: EDIT_TRAINER,
  payload: trainerData
});
