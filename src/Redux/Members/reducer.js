import * as actionCreator from './constants';

const INITIAL_STATE = {
  data: [],
  isPending: false,
  error: ''
};
const membersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionCreator.GET_MEMBERS_PENDING: {
      return { ...state, isPending: true };
    }
    case actionCreator.GET_MEMBERS_SUCCESS: {
      return { ...state, isPending: false, data: action.payload };
    }
    case actionCreator.GET_MEMBERS_ERROR: {
      return { ...state, isPending: false, error: action.payload };
    }
    default:
      return state;
  }
};

export default membersReducer;
