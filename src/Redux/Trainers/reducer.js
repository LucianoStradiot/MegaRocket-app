import {
  GET_TRAINERS_PENDING,
  GET_TRAINERS_SUCCESS,
  GET_TRAINERS_ERROR,
  ADD_TRAINERS_PENDING,
  ADD_TRAINERS_SUCCESS,
  ADD_TRAINERS_ERROR,
  PUT_TRAINERS_PENDING,
  PUT_TRAINERS_SUCCESS,
  PUT_TRAINERS_ERROR,
  DEL_TRAINERS_PENDING,
  DEL_TRAINERS_SUCCESS,
  DEL_TRAINERS_ERROR
} from './constants';

const INITIAL_STATE = {
  data: [],
  isPending: false,
  error: null
};

export const trainersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TRAINERS_PENDING:
      return {
        ...state,
        isPending: true,
        error: null
      };
    case GET_TRAINERS_SUCCESS:
      return {
        ...state,
        isPending: false,
        data: action.payload,
        error: null
      };
    case GET_TRAINERS_ERROR:
      return {
        ...state,
        isPending: false,
        error: action.payload
      };

    case ADD_TRAINERS_PENDING:
      return {
        ...state,
        isPending: true,
        error: null
      };
    case ADD_TRAINERS_SUCCESS:
      return {
        ...state,
        isPending: false,
        data: [...state.data, action.payload],
        error: null
      };
    case ADD_TRAINERS_ERROR:
      return {
        ...state,
        isPending: false,
        error: action.payload
      };

    case PUT_TRAINERS_PENDING:
      return {
        ...state,
        isPending: true,
        error: null
      };
    case PUT_TRAINERS_SUCCESS:
      return {
        ...state,
        isPending: false,
        data: [...state.data, action.payload],
        error: null
      };
    case PUT_TRAINERS_ERROR:
      return {
        ...state,
        isPending: false,
        error: action.payload
      };

    case DEL_TRAINERS_PENDING:
      return {
        ...state,
        isPending: true,
        error: null
      };
    case DEL_TRAINERS_SUCCESS: {
      const idDeletedTrainer = [action.payload.id];
      const currentTrainers = state.data.filter((trainers) => trainers.id !== idDeletedTrainer);
      return {
        ...state,
        usuarios: currentTrainers,
        isLoading: false,
        error: null
      };
    }
    case DEL_TRAINERS_ERROR:
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    default:
      return state;
  }
};
