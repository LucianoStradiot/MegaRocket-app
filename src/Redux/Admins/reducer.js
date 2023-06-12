import { GET_ADMINS_LOADING, GET_ADMINS_SUCCESS, GET_ADMINS_ERROR } from './constants';

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
        isLoading: false
      };
    }
    case GET_ADMINS_ERROR: {
      return {
        ...state,
        data: action.payload,
        isLoading: false
      };
    }
  }
};
