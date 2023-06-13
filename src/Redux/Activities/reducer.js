import {
  GET_ACTIVITIES_LOADING,
  GET_ACTIVITIES_SUCCESS,
  GET_ACTIVITIES_ERROR,
  DEL_ACTIVITIES_LOADING,
  DEL_ACTIVITIES_SUCCESS,
  DEL_ACTIVITIES_ERROR,
  PUT_ACTIVITIES_LOADING,
  PUT_ACTIVITIES_SUCCESS,
  PUT_ACTIVITIES_ERROR,
  POST_ACTIVITIES_LOADING,
  POST_ACTIVITIES_SUCCESS,
  POST_ACTIVITIES_ERROR
} from './constants';

const INITIAL_STATE = {
  data: [],
  isLoading: false,
  error: null
};

export const activitiesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ACTIVITIES_LOADING: {
      return { ...state, isLoading: true, error: null };
    }
    case GET_ACTIVITIES_SUCCESS: {
      return { ...state, isLoading: false, data: action.payload, error: null };
    }
    case GET_ACTIVITIES_ERROR: {
      return { ...state, isLoading: false, error: action.payload };
    }
    case DEL_ACTIVITIES_LOADING: {
      return { ...state, isLoading: true, error: null };
    }
    case DEL_ACTIVITIES_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: state.data.filter((activity) => activity._id !== action.payload.id),
        error: null
      };
    }
    case DEL_ACTIVITIES_ERROR: {
      return { ...state, isLoading: false, error: action.payload };
    }
    case PUT_ACTIVITIES_LOADING: {
      return { ...state, isLoading: true, error: null };
    }
    case PUT_ACTIVITIES_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: state.data.map((activity) =>
          activity._id === action.id ? action.payload : activity
        ),
        error: null
      };
    }
    case PUT_ACTIVITIES_ERROR: {
      return { ...state, isLoading: false, error: action.payload };
    }
    case POST_ACTIVITIES_LOADING: {
      return { ...state, isLoading: true, error: null };
    }
    case POST_ACTIVITIES_SUCCESS: {
      return { ...state, isLoading: false, data: [...state.data, action.payload], error: null };
    }
    case POST_ACTIVITIES_ERROR: {
      return { ...state, isLoading: false, error: action.payload };
    }
    default:
      return state;
  }
};
