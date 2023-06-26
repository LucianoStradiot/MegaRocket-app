import {
  GET_SUPERADMINS_PENDING,
  GET_SUPERADMINS_SUCCESS,
  GET_SUPERADMINS_ERROR,
  GET_SUPERADMINS_BY_ID_PENDING,
  GET_SUPERADMINS_BY_ID_SUCCESS,
  GET_SUPERADMINS_BY_ID_ERROR,
  DELETE_SUPERADMINS_PENDING,
  DELETE_SUPERADMINS_SUCCESS,
  DELETE_SUPERADMINS_ERROR,
  EDIT_SUPERADMIN_PENDING,
  CREATE_SUPERADMINS_PENDING,
  EDIT_SUPERADMIN_ERROR,
  CREATE_SUPERADMINS_ERROR,
  CREATE_SUPERADMINS_SUCCESS,
  EDIT_SUPERADMIN_SUCCESS,
  LOGIN_SUPERADMINS_PENDING,
  LOGIN_SUPERADMINS_SUCCESS,
  LOGIN_SUPERADMINS_ERROR
} from './constants';

const INITIAL_STATE = {
  loading: false,
  data: [],
  error: null
};

export const superAdminsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SUPERADMINS_PENDING:
    case GET_SUPERADMINS_BY_ID_PENDING:
    case DELETE_SUPERADMINS_PENDING:
    case EDIT_SUPERADMIN_PENDING:
    case CREATE_SUPERADMINS_PENDING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_SUPERADMINS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case GET_SUPERADMINS_ERROR:
    case DELETE_SUPERADMINS_ERROR:
    case GET_SUPERADMINS_BY_ID_ERROR:
    case EDIT_SUPERADMIN_ERROR:
    case CREATE_SUPERADMINS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case GET_SUPERADMINS_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case CREATE_SUPERADMINS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload]
      };
    case EDIT_SUPERADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.map((superAdmin) => {
          if (superAdmin._id === action.payload._id) {
            return action.payload;
          } else {
            return superAdmin;
          }
        })
      };
    case DELETE_SUPERADMINS_SUCCESS:
      return {
        ...state,
        data: state.data.filter((superAdmin) => superAdmin._id !== action.payload),
        loading: false,
        error: null
      };
    case LOGIN_SUPERADMINS_PENDING: {
      return {
        ...state,
        isPending: true,
        error: null
      };
    }
    case LOGIN_SUPERADMINS_SUCCESS: {
      return {
        ...state,
        isPending: false,
        data: state.data,
        error: null
      };
    }
    case LOGIN_SUPERADMINS_ERROR: {
      return {
        ...state,
        isPending: false,
        error: state.error
      };
    }
    default:
      return state;
  }
};
