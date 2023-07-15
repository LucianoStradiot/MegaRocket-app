import { storage } from 'firebase/app';
import 'firebase/storage';

export const changeProfilePhoto = (userId, file) => {
  return async (dispatch) => {
    const storageRef = storage().ref();
    const fileRef = storageRef.child(`profile_photos/${userId}`);
    await fileRef.put(file);
    const photoUrl = await fileRef.getDownloadURL();

    // Actualizar el estado de la aplicación con la nueva URL de la foto de perfil
    dispatch({ type: 'CHANGE_PROFILE_PHOTO', payload: photoUrl });
  };
};
