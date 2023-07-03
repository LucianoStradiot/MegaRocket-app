import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_LOADING,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  GET_AUTH_LOADING,
  GET_AUTH_SUCCESS,
  GET_AUTH_ERROR
} from './constants';

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthLoading: true
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_LOADING:
    case LOGOUT_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: null
      };
    case LOGIN_ERROR:
    case LOGOUT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        isLoading: false,
        error: null
      };
    case GET_AUTH_LOADING:
      return {
        ...state,
        isAuthLoading: true
      };
    case GET_AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: null,
        isAuthLoading: false
      };
    case GET_AUTH_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        isAuthLoading: false
      };
    default:
      return state;
  }
};

export default authReducer;
