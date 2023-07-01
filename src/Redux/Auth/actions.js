import {
  GET_AUTH_LOADING,
  GET_AUTH_SUCCESS,
  GET_AUTH_ERROR,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_LOADING,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  SIGN_UP_LOADING,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR
} from './constants';

export const getAuthLoading = () => {
  return {
    type: GET_AUTH_LOADING
  };
};

export const getAuthSuccess = (data) => {
  return {
    type: GET_AUTH_SUCCESS,
    payload: data
  };
};

export const getAuthError = (error) => {
  return {
    type: GET_AUTH_ERROR,
    payload: error
  };
};
export const loginLoading = () => {
  return {
    type: LOGIN_LOADING
  };
};

export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data
  };
};

export const loginError = (error) => {
  return {
    type: LOGIN_ERROR,
    payload: error
  };
};

export const logoutLoading = () => {
  return {
    type: LOGOUT_LOADING
  };
};

export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

export const logoutError = (error) => {
  return {
    type: LOGOUT_ERROR,
    payload: error
  };
};

export const signUpLoading = () => {
  return {
    type: SIGN_UP_LOADING
  };
};

export const signUpSuccess = (data) => {
  return {
    type: SIGN_UP_SUCCESS,
    payload: data
  };
};

export const signUpError = (error) => {
  return {
    type: SIGN_UP_ERROR,
    payload: error
  };
};
