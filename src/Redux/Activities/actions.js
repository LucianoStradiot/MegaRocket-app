import {
  GET_ACTIVITIES_LOADING,
  GET_ACTIVITIES_SUCCESS,
  GET_ACTIVITIES_ERROR,
  DEL_ACTIVITIES_LOADING,
  DEL_ACTIVITIES_SUCCESS,
  DEL_ACTIVITIES_ERROR,
  PUT_ACTIVITIES_LOADING,
  PUT_ACTIVITIES_SUCCESS,
  PUT_ACTIVITIES_ERROR,
  POST_ACTIVITIES_LOADING,
  POST_ACTIVITIES_SUCCESS,
  POST_ACTIVITIES_ERROR,
  GET_ACTIVE_ACTIVITIES_ERROR,
  GET_ACTIVE_ACTIVITIES_LOADING,
  GET_ACTIVE_ACTIVITIES_SUCCESS
} from './constants';

export const getActivitiesLoading = () => {
  return { type: GET_ACTIVITIES_LOADING };
};

export const getActivitiesSuccess = (activity) => {
  return { type: GET_ACTIVITIES_SUCCESS, payload: activity };
};

export const getActivitiesError = (error) => {
  return { type: GET_ACTIVITIES_ERROR, payload: error };
};
export const getActiveActivitiesLoading = () => {
  return { type: GET_ACTIVE_ACTIVITIES_LOADING };
};

export const getActiveActivitiesSuccess = (activity) => {
  return { type: GET_ACTIVE_ACTIVITIES_SUCCESS, payload: activity };
};

export const getActiveActivitiesError = (error) => {
  return { type: GET_ACTIVE_ACTIVITIES_ERROR, payload: error };
};

export const delActivitiesLoading = () => {
  return { type: DEL_ACTIVITIES_LOADING };
};

export const delActivitiesSuccess = (deleteActivity) => {
  return { type: DEL_ACTIVITIES_SUCCESS, payload: deleteActivity };
};

export const delActivitiesError = (error) => {
  return { type: DEL_ACTIVITIES_ERROR, payload: error };
};

export const putActivitiesLoading = () => {
  return { type: PUT_ACTIVITIES_LOADING };
};

export const putActivitiesSuccess = (updateActivity, id) => {
  return { type: PUT_ACTIVITIES_SUCCESS, payload: updateActivity, id };
};

export const putActivitiesError = (error) => {
  return { type: PUT_ACTIVITIES_ERROR, payload: error };
};

export const postActivitiesLoading = () => {
  return { type: POST_ACTIVITIES_LOADING };
};

export const postActivitiesSuccess = (createActivity) => {
  return { type: POST_ACTIVITIES_SUCCESS, payload: createActivity };
};

export const postActivitiesError = (error) => {
  return { type: POST_ACTIVITIES_ERROR, payload: error };
};
