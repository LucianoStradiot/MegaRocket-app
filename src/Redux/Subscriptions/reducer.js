import {
  GET_SUBSCRIPTIONS_PENDING,
  GET_SUBSCRIPTIONS_SUCCESS,
  GET_SUBSCRIPTIONS_ERROR
} from './constants';

const INITIAL_STATE = {
  data: [],
  isPending: false,
  error: null
};

const subscriptionsReducer = (state = INITIAL_STATE, action) => {
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
    default:
      return state;
  }
};

export default subscriptionsReducer;
