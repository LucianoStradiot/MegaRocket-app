import {
  getTrainersPending,
  getTrainersSuccess,
  getTrainersError,
  postTrainersPending,
  postTrainersSuccess,
  postTrainersError,
  putTrainersPending,
  putTrainersSuccess,
  putTrainersError,
  deleteTrainersPending,
  deleteTrainersSuccess,
  deleteTrainersError
} from './actions';

export const getTrainers = () => {
  return async (dispatch) => {
    try {
      dispatch(getTrainersPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers`, {
        method: 'GET'
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(getTrainersSuccess(data.data));
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch(getTrainersError(error));
    }
  };
};

export const createTrainer = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(postTrainersPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(postTrainersSuccess(data.data));
      } else {
        dispatch(postTrainersError(data.message));
      }
      return data;
    } catch (error) {
      return error;
    }
  };
};

export const updateTrainer = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(putTrainersPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers/${payload.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload.body)
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(putTrainersSuccess(data.data, payload.id));
      } else {
        dispatch(putTrainersError(data.message));
      }
      return data;
    } catch (error) {
      return error;
    }
  };
};

export const deleteTrainer = (id) => {
  return async (dispatch) => {
    try {
      dispatch(deleteTrainersPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(deleteTrainersSuccess(data.data));
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch(deleteTrainersError(error));
      return error;
    }
  };
};
