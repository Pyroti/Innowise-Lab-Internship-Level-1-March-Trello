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

const writeUserGoogleData = async (userGoogle: firebase.User) => {
  try {
    const db = getDatabase();
    const usersRef = `users/${userGoogle.uid}`;
    const userCountRef = ref(db, usersRef);
    update(userCountRef, {
      userId: userGoogle.uid,
      username: userGoogle.displayName,
      email: userGoogle.email
    });
  } catch (error) {
    const err = (error as Error).message;
    return err;
  }
};

export const googleSignInInitiate = () => {
  return async (dispatch: Dispatch<GoogleSignInAction>): Promise<void> => {
    try {
      dispatch(googleSignInStart());
      const { user } = await auth.signInWithPopup(googleAuthProvider);
      const res = await writeUserGoogleData(user);
      if (!res) {
        dispatch(googleSignInSuccess(user));
      }
    } catch (error) {
      const err = (error as Error).message;
      dispatch(googleSignInFail(err));
    }
  };
};
