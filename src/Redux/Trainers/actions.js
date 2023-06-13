import {
  GET_TRAINERS_PENDING,
  GET_TRAINERS_SUCCESS,
  GET_TRAINERS_ERROR,
  ADD_TRAINERS_PENDING,
  ADD_TRAINERS_SUCCESS,
  ADD_TRAINERS_ERROR,
  PUT_TRAINERS_PENDING,
  PUT_TRAINERS_SUCCESS,
  PUT_TRAINERS_ERROR,
  DEL_TRAINERS_PENDING,
  DEL_TRAINERS_SUCCESS,
  DEL_TRAINERS_ERROR
} from './constants';

export const getTrainersPending = () => ({
  type: GET_TRAINERS_PENDING
});

export const getTrainersSuccess = (trainers) => ({
  type: GET_TRAINERS_SUCCESS,
  payload: trainers
});

export const getTrainersError = (error) => ({
  type: GET_TRAINERS_ERROR,
  payload: error
});

export const postTrainersPending = () => {
  return {
    type: ADD_TRAINERS_PENDING
  };
};

export const postTrainersSuccess = (newTrainer) => {
  return {
    type: ADD_TRAINERS_SUCCESS,
    payload: newTrainer
  };
};

export const postTrainersError = (error) => {
  return {
    type: ADD_TRAINERS_ERROR,
    payload: error
  };
};

export const putTrainersPending = () => {
  return {
    type: PUT_TRAINERS_PENDING
  };
};

export const putTrainersSuccess = (updateTrainer) => {
  return {
    type: PUT_TRAINERS_SUCCESS,
    payload: updateTrainer
  };
};

export const putTrainersError = (error) => {
  return {
    type: PUT_TRAINERS_ERROR,
    payload: error
  };
};

export const deleteTrainersPending = () => {
  return {
    type: DEL_TRAINERS_PENDING
  };
};

export const deleteTrainersSuccess = (deleteTrainers) => {
  return {
    type: DEL_TRAINERS_SUCCESS,
    payload: deleteTrainers
  };
};

export const deleteTrainersError = (error) => {
  return {
    type: DEL_TRAINERS_ERROR,
    payload: error
  };
};
