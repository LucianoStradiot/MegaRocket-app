import { GET_TRAINERS_LOADING, SET_TRAINERS_SUCCESS, GET_TRAINERS_ERROR } from './constants';

const INITIAL_STATE = {
  data: [],
  isLoading: false,
  error: null
};

export const activitiesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TRAINERS_LOADING: {
      return { ...state, isLoading: true, error: null };
    }
    case SET_TRAINERS_SUCCESS: {
      return { ...state, data: action.payload };
    }
    case GET_TRAINERS_ERROR: {
      return { ...state };
    }
  }
};
