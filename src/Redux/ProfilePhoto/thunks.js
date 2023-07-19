import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {
  updateProfilePhotoRequest,
  updateProfilePhotoSuccess,
  updateProfilePhotoFailure
} from './actions';
import { firebaseApp } from 'helper/firebase';
import { updateMember } from 'Redux/Members/thunks';
import { updateTrainer } from 'Redux/Trainers/thunks';

export const updateProfilePhoto = (selectedFile, id) => {
  return async (dispatch) => {
    const storage = getStorage(firebaseApp);

    dispatch(updateProfilePhotoRequest());
    try {
      const storageRef = ref(storage, `profilePhotos/${selectedFile.name}`);

      const uploadTask = uploadBytesResumable(storageRef, selectedFile);

      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      await dispatch(updateProfilePhotoSuccess(downloadURL));
      console.log(id);
      const payload = {
        id: id,
        body: {
          profilePhoto: downloadURL
        }
      };
      if (sessionStorage.getItem('role') === 'MEMBER') {
        await dispatch(updateMember(payload));
      } else {
        await dispatch(updateTrainer(payload));
      }
      return downloadURL;
    } catch (error) {
      dispatch(updateProfilePhotoFailure(error));
      return false;
    }
  };
};
