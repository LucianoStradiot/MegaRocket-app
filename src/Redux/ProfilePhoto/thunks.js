import {
  updateProfilePhotoRequest,
  updateProfilePhotoSuccess,
  updateProfilePhotoFailure
} from './actions';

import { storage } from 'helper/firebase';

export const updateProfilePhoto = (selectedFile) => {
  return async (dispatch) => {
    dispatch(updateProfilePhotoRequest());

    try {
      const uploadTaskSnapshot = await storage
        .ref(`${process.env.REACT_APP_STORAGE_BUCKET}/profilePhotos/${selectedFile.name}`)
        .put(selectedFile);

      // Obtener la URL de descarga de la imagen subida
      const downloadURL = await uploadTaskSnapshot.ref.getDownloadURL();

      dispatch(updateProfilePhotoSuccess(downloadURL));
    } catch (error) {
      dispatch(updateProfilePhotoFailure(error));
    }
  };
};
