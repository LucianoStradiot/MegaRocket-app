import { GET_ADMINS_LOADING, GET_ADMINS_SUCCESS, GET_ADMINS_ERROR } from './constants';

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
