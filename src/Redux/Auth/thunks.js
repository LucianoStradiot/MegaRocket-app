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
    console.log('entro a login', credentials);
    try {
      const firebaseResponse = await firebaseApp
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password);
      console.log('firebaseResponse', firebaseResponse);
      const token = await firebaseResponse.user.getIdToken();
      console.log('token', token);
      const {
        claims: { role }
      } = await firebaseResponse.user.getIdTokenResult();
      return dispatch(loginSuccess({ role, token }));
    } catch (error) {
      console.log('entro al catch');
      return dispatch(loginError(error.toString()));
    }
  };
};

export const getAuth = (token) => {
  return async (dispatch) => {
    dispatch(getAuthLoading());
    try {
      console.log(`${process.env.REACT_APP_API_URL}/api/auth/login`);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        headers: { token }
      });
      console.log(response);
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
