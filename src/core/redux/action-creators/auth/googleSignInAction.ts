import firebase from 'firebase/compat/app';
import { getDatabase, ref, update } from 'firebase/database';
import { Dispatch } from 'redux';
import { auth, googleAuthProvider } from '../../../firebase/firebase';
import {
  GoogleSignInAction,
  GoogleSignInTypes
} from '../../types/auth/googleSignInTypes';

const googleSignInStart = (): GoogleSignInAction => ({
  type: GoogleSignInTypes.GOOGLE_SIGN_IN_START
});

const googleSignInSuccess = (
  user: firebase.User | null
): GoogleSignInAction => ({
  type: GoogleSignInTypes.GOOGLE_SIGN_IN_SUCCESS,
  payload: user
});

const googleSignInFail = (error: string): GoogleSignInAction => ({
  type: GoogleSignInTypes.GOOGLE_SIGN_IN_FAIL,
  payload: error
});

const writeUserGoogleData = (userGoogle: firebase.User) => {
  const db = getDatabase();
  const usersRef = `users/${userGoogle.uid}`;
  const userCountRef = ref(db, usersRef);
  update(userCountRef, {
    userId: userGoogle.uid,
    username: userGoogle.displayName,
    email: userGoogle.email
  });
};

export const googleSignInInitiate = () => {
  return (dispatch: Dispatch<GoogleSignInAction>): void => {
    dispatch(googleSignInStart());
    auth
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        writeUserGoogleData(user);
        dispatch(googleSignInSuccess(user));
      })
      .catch((error: Error) => dispatch(googleSignInFail(error.message)));
  };
};
