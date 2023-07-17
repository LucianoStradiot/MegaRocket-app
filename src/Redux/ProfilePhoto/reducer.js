// reducers.js
import {
  UPDATE_PROFILE_PHOTO_REQUEST,
  UPDATE_PROFILE_PHOTO_SUCCESS,
  UPDATE_PROFILE_PHOTO_FAILURE
} from './constants';

const initialState = {
  profilePhoto: null,
  loading: false,
  error: null
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_PHOTO_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case UPDATE_PROFILE_PHOTO_SUCCESS:
      return {
        ...state,
        profilePhoto: action.payload,
        loading: false,
        error: null
      };
    case UPDATE_PROFILE_PHOTO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
