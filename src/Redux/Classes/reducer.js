import { GET_CLASSES_ERROR, GET_CLASSES_LOADING, GET_CLASSES_SUCCESS } from './constants';

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
    default:
      return state;
  }
};
