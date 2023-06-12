import { GET_ACTIVITIES_LOADING, GET_ACTIVITIES_SUCCESS, GET_ACTIVITIES_ERROR } from './constants';

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
    default:
      return state;
  }
};
