import {
  GET_ADMINS_LOADING,
  GET_ADMINS_SUCCESS,
  GET_ADMINS_ERROR,
  DEL_ADMINS_ERROR,
  DEL_ADMINS_LOADING,
  DEL_ADMINS_SUCCESS,
  POST_ADMINS_ERROR,
  POST_ADMINS_LOADING,
  POST_ADMINS_SUCCESS,
  PUT_ADMINS_ERROR,
  PUT_ADMINS_LOADING,
  PUT_ADMINS_SUCCESS
} from './constants';

export const getAdminsLoading = () => {
  return {
    type: GET_ADMINS_LOADING
  };
};

export const getAdminsSuccess = (admins) => {
  return {
    type: GET_ADMINS_SUCCESS,
    payload: admins
  };
};

export const getAdminsError = (error) => {
  return {
    type: GET_ADMINS_ERROR,
    payload: error
  };
};

export const delAdminsLoading = () => {
  return {
    type: DEL_ADMINS_LOADING
  };
};

export const delAdminsSuccess = (deletedAdmin) => {
  return {
    type: DEL_ADMINS_SUCCESS,
    payload: deletedAdmin
  };
};

export const delAdminsError = (error) => {
  return {
    type: DEL_ADMINS_ERROR,
    payload: error
  };
};

export const putAdminsLoading = () => {
  return {
    type: PUT_ADMINS_LOADING
  };
};

export const putAdminsSuccess = (updAdmin, id) => {
  return {
    type: PUT_ADMINS_SUCCESS,
    payload: updAdmin,
    id
  };
};

export const putAdminsError = (error) => {
  return {
    type: PUT_ADMINS_ERROR,
    payload: error
  };
};

export const postAdminsLoading = () => {
  return {
    type: POST_ADMINS_LOADING
  };
};

export const postAdminsSuccess = (newAdmin) => {
  return {
    type: POST_ADMINS_SUCCESS,
    payload: newAdmin
  };
};

export const postAdminsError = (error) => {
  return {
    type: POST_ADMINS_ERROR,
    payload: error
  };
};
