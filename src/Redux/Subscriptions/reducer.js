import {
  GET_SUBSCRIPTIONS_PENDING,
  GET_SUBSCRIPTIONS_SUCCESS,
  GET_SUBSCRIPTIONS_ERROR,
  ADD_SUBSCRIPTIONS_PENDING,
  ADD_SUBSCRIPTIONS_SUCCESS,
  ADD_SUBSCRIPTIONS_ERROR,
  PUT_SUBSCRIPTIONS_PENDING,
  PUT_SUBSCRIPTIONS_SUCCESS,
  PUT_SUBSCRIPTIONS_ERROR,
  DEL_SUBSCRIPTIONS_PENDING,
  DEL_SUBSCRIPTIONS_SUCCESS,
  DEL_SUBSCRIPTIONS_ERROR
} from './constants';

const INITIAL_STATE = {
  data: [],
  isPending: false,
  error: null
};

export const subscriptionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SUBSCRIPTIONS_PENDING:
      return {
        ...state,
        isPending: true,
        error: null
      };
    case GET_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        isPending: false,
        data: action.payload,
        error: null
      };
    case GET_SUBSCRIPTIONS_ERROR:
      return {
        ...state,
        isPending: false,
        error: action.payload
      };

    case ADD_SUBSCRIPTIONS_PENDING:
      return {
        ...state,
        isPending: true,
        error: null
      };
    case ADD_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        isPending: false,
        data: [...state.data, action.payload],
        error: null
      };
    case ADD_SUBSCRIPTIONS_ERROR:
      return {
        ...state,
        isPending: false,
        error: action.payload
      };

    case PUT_SUBSCRIPTIONS_PENDING:
      return {
        ...state,
        isPending: true,
        error: null
      };
    case PUT_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        isPending: false,
        data: state.data.map((sub) => (sub._id === action.id ? action.payload : sub)),
        error: null
      };
    case PUT_SUBSCRIPTIONS_ERROR:
      return {
        ...state,
        isPending: false,
        error: action.payload
      };

    case DEL_SUBSCRIPTIONS_PENDING:
      return {
        ...state,
        isPending: true,
        error: null
      };
    case DEL_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        isPending: false,
        data: state.data.filter((sub) => sub._id !== action.payload.id),
        error: null
      };
    case DEL_SUBSCRIPTIONS_ERROR:
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    default:
      return state;
  }
};
