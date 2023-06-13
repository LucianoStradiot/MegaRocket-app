import {
  GET_CLASSES_LOADING,
  GET_CLASSES_SUCCESS,
  GET_CLASSES_ERROR,
  DEL_CLASSES_LOADING,
  DEL_CLASSES_SUCCESS,
  DEL_CLASSES_ERROR,
  POST_CLASSES_LOADING,
  POST_CLASSES_SUCCESS,
  POST_CLASSES_ERROR,
  PUT_CLASSES_LOADING,
  PUT_CLASSES_SUCCESS,
  PUT_CLASSES_ERROR
} from './constants';

export const getClassesLoading = () => {
  return {
    type: GET_CLASSES_LOADING
  };
};

export const getClassesSuccess = (classes) => {
  return {
    type: GET_CLASSES_SUCCESS,
    payload: classes
  };
};

export const getClassesError = (error) => {
  return {
    type: GET_CLASSES_ERROR,
    payload: error
  };
};

export const deleteClassLoading = () => {
  return {
    type: DEL_CLASSES_LOADING
  };
};

export const deleteClassSuccess = (deletedAdmin) => {
  return {
    type: DEL_CLASSES_SUCCESS,
    payload: deletedAdmin
  };
};

export const deleteClassError = (error) => {
  return {
    type: DEL_CLASSES_ERROR,
    payload: error
  };
};

export const postClassLoading = () => {
  return {
    type: POST_CLASSES_LOADING
  };
};

export const postClassSuccess = (newClass) => {
  return {
    type: POST_CLASSES_SUCCESS,
    payload: newClass
  };
};

export const postClassError = (error) => {
  return {
    type: POST_CLASSES_ERROR,
    payload: error
  };
};

export const putClassLoading = () => {
  return {
    type: PUT_CLASSES_LOADING
  };
};

export const putClassSuccess = (newClass) => {
  return {
    type: PUT_CLASSES_SUCCESS,
    payload: newClass
  };
};

export const putClassError = (error) => {
  return {
    type: PUT_CLASSES_ERROR,
    payload: error
  };
};
