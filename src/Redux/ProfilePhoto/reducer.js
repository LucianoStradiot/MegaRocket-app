// reducers.js
import {
  UPDATE_PROFILE_PHOTO_REQUEST,
  UPDATE_PROFILE_PHOTO_SUCCESS,
  UPDATE_PROFILE_PHOTO_FAILURE,
  UPDATE_PROFILE_PHOTO_PROGRESS
} from './constants';

const initialState = {
  profilePhoto: `${process.env.PUBLIC_URL}/assets/images/defaultProfile.png`,
  loading: false,
  error: null,
  progress: 0
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
    case UPDATE_PROFILE_PHOTO_PROGRESS:
      return {
        ...state,
        progress: action.payload
      };
    default:
      return state;
  }
};
