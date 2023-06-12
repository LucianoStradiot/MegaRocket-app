import { GET_ACTIVITIES_LOADING, GET_ACTIVITIES_SUCCESS, GET_ACTIVITIES_ERROR } from './constants';

export const getActivitiesLoading = () => {
  return { type: GET_ACTIVITIES_LOADING };
};

export const getActivitiesSuccess = (activity) => {
  return { type: GET_ACTIVITIES_SUCCESS, payload: activity };
};

export const getActivitiesError = (error) => {
  return { type: GET_ACTIVITIES_ERROR, payload: error };
};
