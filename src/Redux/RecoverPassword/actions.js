import {
  RECOVER_PASSWORD_ERROR,
  RECOVER_PASSWORD_LOADING,
  RECOVER_PASSWORD_SUCCESS
} from './constants';
export const recoverPasswordError = (error) => {
  return {
    type: RECOVER_PASSWORD_ERROR,
    payload: error
  };
};

export const recoverPasswordLoading = () => {
  return {
    type: RECOVER_PASSWORD_LOADING
  };
};

export const recoverPasswordSuccess = () => {
  return {
    type: RECOVER_PASSWORD_SUCCESS
  };
};
