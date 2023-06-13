import {
  GET_CLASSES_ERROR,
  GET_CLASSES_LOADING,
  GET_CLASSES_SUCCESS,
  DEL_CLASSES_ERROR,
  DEL_CLASSES_LOADING,
  DEL_CLASSES_SUCCESS,
  POST_CLASSES_ERROR,
  POST_CLASSES_LOADING,
  POST_CLASSES_SUCCESS
} from './constants';

const INITIAL_STATE = {
  data: [],
  isLoading: false,
  error: null
};

export const classesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CLASSES_LOADING: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case GET_CLASSES_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        error: null
      };
    }
    case GET_CLASSES_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case DEL_CLASSES_LOADING: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case DEL_CLASSES_SUCCESS: {
      return {
        ...state,
        data: action.payload, // ver
        isLoading: false,
        error: null
      };
    }
    case DEL_CLASSES_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case POST_CLASSES_LOADING: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case POST_CLASSES_SUCCESS: {
      return {
        ...state,
        data: [...state, action.payload],
        isLoading: false,
        error: null
      };
    }
    case POST_CLASSES_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    default:
      return state;
  }
};
