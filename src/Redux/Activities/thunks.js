import { getActivitiesLoading, getActivitiesSuccess, getActivitiesError } from './actions';

export const getActivities = () => {
  return async (dispatch) => {
    try {
      dispatch(getActivitiesLoading());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activities`, {
        method: 'GET'
      });
      const data = await response.json();
      if (response.ok) {
        console.log('data', data);
        dispatch(getActivitiesSuccess(data.data));
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch(getActivitiesError(error));
    }
  };
};
