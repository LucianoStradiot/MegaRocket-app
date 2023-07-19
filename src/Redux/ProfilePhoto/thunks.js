import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {
  updateProfilePhotoRequest,
  updateProfilePhotoSuccess,
  updateProfilePhotoFailure
} from './actions';
import { firebaseApp } from 'helper/firebase';

export const updateProfilePhoto = (selectedFile) => {
  return async (dispatch) => {
    const storage = getStorage(firebaseApp);

    dispatch(updateProfilePhotoRequest());
    try {
      const storageRef = ref(storage, `profilePhotos/${selectedFile.name}`);

      const uploadTask = uploadBytesResumable(storageRef, selectedFile);

      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      console.log('holanda', downloadURL);
      await dispatch(updateProfilePhotoSuccess(downloadURL));
      return downloadURL;
    } catch (error) {
      dispatch(updateProfilePhotoFailure(error));
      return false;
    }
  };
};
