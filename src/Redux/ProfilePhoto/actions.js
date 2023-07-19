import {
  UPDATE_PROFILE_PHOTO_REQUEST,
  UPDATE_PROFILE_PHOTO_SUCCESS,
  UPDATE_PROFILE_PHOTO_FAILURE,
  UPDATE_PROFILE_PHOTO_PROGRESS
} from './constants';

export const updateProfilePhotoRequest = () => ({
  type: UPDATE_PROFILE_PHOTO_REQUEST
});

export const updateProfilePhotoProgress = (progress) => {
  return {
    type: UPDATE_PROFILE_PHOTO_PROGRESS,
    payload: progress
  };
};

export const updateProfilePhotoSuccess = (photoUrl) => ({
  type: UPDATE_PROFILE_PHOTO_SUCCESS,
  payload: photoUrl
});

export const updateProfilePhotoFailure = (error) => ({
  type: UPDATE_PROFILE_PHOTO_FAILURE,
  payload: error
});
