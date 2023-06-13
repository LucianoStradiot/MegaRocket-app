import {
  getActivitiesLoading,
  getActivitiesSuccess,
  getActivitiesError,
  delActivitiesLoading,
  delActivitiesSuccess,
  delActivitiesError,
  postActivitiesLoading,
  postActivitiesSuccess,
  postActivitiesError,
  putActivitiesLoading,
  putActivitiesSuccess,
  putActivitiesError
} from './actions';

export const getActivities = () => {
  return async (dispatch) => {
    try {
      dispatch(getActivitiesLoading());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activities`, {
        method: 'GET'
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(getActivitiesSuccess(data.data));
      } else {
        throw new Error(data.message);
      }
      return data;
    } catch (error) {
      dispatch(getActivitiesError(error));
    }
  };
};

export const delActivities = (id) => {
  return async (dispatch) => {
    try {
      dispatch(delActivitiesLoading());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(delActivitiesSuccess(data.data));
      } else {
        dispatch(delActivitiesError(data.message));
      }
      return data;
    } catch (error) {
      return error;
    }
  };
};

export const updateActivities = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(putActivitiesLoading());
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/activities/${payload.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload.body)
        }
      );
      const data = await response.json();
      if (response.ok) {
        dispatch(putActivitiesSuccess(data.data, payload.id));
      } else {
        dispatch(putActivitiesError(data.message));
      }
      return data;
    } catch (error) {
      return error;
    }
  };
};

export const createActivities = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(postActivitiesLoading());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(postActivitiesSuccess(data.data));
      } else {
        dispatch(postActivitiesError(data.message));
      }
      return data;
    } catch (error) {
      return error;
    }
  };
};
