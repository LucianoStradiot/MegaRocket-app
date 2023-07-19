import {
  getAuthLoading,
  getAuthSuccess,
  getAuthError,
  loginLoading,
  loginSuccess,
  loginError,
  logoutLoading,
  logoutSuccess,
  logoutError
} from './actions';

import { firebaseApp } from 'helper/firebase';

export const login = (credentials) => {
  return async (dispatch) => {
    dispatch(loginLoading());
    try {
      const firebaseResponse = await firebaseApp
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password);
      const token = await firebaseResponse.user.getIdToken();
      const {
        claims: { role }
      } = await firebaseResponse.user.getIdTokenResult();
      dispatch(getAuth());
      return dispatch(loginSuccess({ role, token }));
    } catch (error) {
      return dispatch(loginError(error.toString()));
    }
  };
};

export const getAuth = (token) => {
  return async (dispatch) => {
    dispatch(getAuthLoading());
    try {
      const firebaseUid = sessionStorage.getItem('firebaseUid');
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/auth/login/${firebaseUid}`,
        {
          headers: {
            'Content-Type': 'application/json',
            token: token
          }
        }
      );
      const res = await response.json();
      return dispatch(getAuthSuccess(res.data));
    } catch (error) {
      return dispatch(getAuthError(error.toString()));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(logoutLoading());
    try {
      await firebaseApp.auth().signOut();
      return dispatch(logoutSuccess());
    } catch (error) {
      return dispatch(logoutError(error.toString()));
    }
  };
};
