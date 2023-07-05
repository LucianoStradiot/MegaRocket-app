import * as actionCreator from './constants';

const INITIAL_STATE = {
  data: [],
  isPending: false,
  error: ''
};
export const membersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionCreator.GET_MEMBERS_PENDING: {
      return {
        ...state,
        isPending: true,
        error: null
      };
    }
    case actionCreator.GET_MEMBERS_SUCCESS: {
      return {
        ...state,
        isPending: false,
        data: action.payload,
        error: null
      };
    }
    case actionCreator.GET_MEMBERS_ERROR: {
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    }
    case actionCreator.PUT_MEMBERS_PENDING: {
      return {
        ...state,
        isPending: true,
        error: null
      };
    }
    case actionCreator.PUT_MEMBERS_SUCCESS: {
      return {
        ...state,
        isPending: false,
        data: state.data.map((member) => (member._id === action.id ? action.payload : member)),
        error: null
      };
    }
    case actionCreator.PUT_MEMBERS_ERROR: {
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    }
    case actionCreator.POST_MEMBERS_PENDING: {
      return {
        ...state,
        isPending: true,
        error: null
      };
    }
    case actionCreator.POST_MEMBERS_SUCCESS: {
      return {
        ...state,
        isPending: false,
        data: [...state.data, action.payload],
        error: null
      };
    }
    case actionCreator.POST_MEMBERS_ERROR: {
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    }
    case actionCreator.DELETE_MEMBERS_PENDING: {
      return {
        ...state,
        isPending: true,
        error: null
      };
    }
    case actionCreator.DELETE_MEMBERS_SUCCESS: {
      return {
        ...state,
        isPending: false,
        data: state.data.filter((member) => member._id !== action.payload._id),
        error: null
      };
    }
    case actionCreator.DELETE_MEMBERS_ERROR: {
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    }
    default:
      return state;
  }
};
