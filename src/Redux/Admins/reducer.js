import {
  GET_ADMINS_LOADING,
  GET_ADMINS_SUCCESS,
  GET_ADMINS_ERROR,
  PUT_ADMINS_LOADING,
  PUT_ADMINS_ERROR,
  PUT_ADMINS_SUCCESS,
  POST_ADMINS_ERROR,
  POST_ADMINS_LOADING,
  POST_ADMINS_SUCCESS,
  DEL_ADMINS_ERROR,
  DEL_ADMINS_LOADING,
  DEL_ADMINS_SUCCESS
} from './constants';

const INITIAL_STATE = {
  data: [],
  isLoading: false,
  error: null
};

export const adminsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ADMINS_LOADING: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case GET_ADMINS_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        error: null
      };
    }
    case GET_ADMINS_ERROR: {
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    }
    case PUT_ADMINS_LOADING: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case PUT_ADMINS_SUCCESS: {
      return {
        ...state,
        data: state.data.map((admin) => (admin._id === action.id ? action.payload : admin)),
        isLoading: false,
        error: null
      };
    }
    case PUT_ADMINS_ERROR: {
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    }
    case POST_ADMINS_LOADING: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case POST_ADMINS_SUCCESS: {
      return {
        ...state,
        data: [...state.data, action.payload],
        isLoading: false,
        error: null
      };
    }
    case POST_ADMINS_ERROR: {
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    }
    case DEL_ADMINS_LOADING: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case DEL_ADMINS_SUCCESS: {
      const idDeletedAdmin = [action.payload.id];
      const currentAdmins = state.data.filter((admins) => admins.id !== idDeletedAdmin);
      return {
        ...state,
        data: [currentAdmins],
        isLoading: false,
        error: null
      };
    }
    case DEL_ADMINS_ERROR: {
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    }
    default:
      return state;
  }
};
