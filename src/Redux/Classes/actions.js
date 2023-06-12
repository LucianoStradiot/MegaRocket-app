import { GET_CLASSES_ERROR, GET_CLASSES_LOADING, GET_CLASSES_SUCCESS } from './constants';

export const getClassesLoading = () => {
  return {
    type: GET_CLASSES_LOADING
  };
};

export const getClassesError = (error) => {
  return {
    type: GET_CLASSES_ERROR,
    payload: error
  };
};

export const getClassesSuccess = (classes) => {
  return {
    type: GET_CLASSES_SUCCESS,
    payload: classes
  };
};
