import { firebaseApp } from 'helper/firebase';
import { recoverPasswordError, recoverPasswordLoading, recoverPasswordSuccess } from './actions';

export const recoverPassword = (email) => {
  return async (dispatch) => {
    dispatch(recoverPasswordLoading());
    try {
      await firebaseApp.auth().sendPasswordResetEmail(email);
      dispatch(recoverPasswordSuccess());
      return true;
    } catch (error) {
      dispatch(recoverPasswordError(error));
      return false;
    }
  };
};
