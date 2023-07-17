import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);

export const tokenListener = () => {
  firebase.auth().onIdTokenChanged(async (user) => {
    if (user) {
      const token = await user.getIdToken();
      const {
        claims: { role }
      } = await user.getIdTokenResult();
      const firebaseUid = user.uid;
      sessionStorage.setItem('role', role);
      sessionStorage.setItem('firebaseUid', firebaseUid);
      sessionStorage.setItem('token', token);
    }
  });
};
