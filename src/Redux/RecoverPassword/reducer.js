import {
  RECOVER_PASSWORD_ERROR,
  RECOVER_PASSWORD_LOADING,
  RECOVER_PASSWORD_SUCCESS
} from './constants';

const initialState = {
  loading: false,
  error: null
};

export const recoverPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECOVER_PASSWORD_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case RECOVER_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null
      };
    case RECOVER_PASSWORD_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
