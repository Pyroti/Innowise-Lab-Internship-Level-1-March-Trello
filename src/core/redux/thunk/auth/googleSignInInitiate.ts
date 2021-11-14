import firebase from 'firebase/compat/app';
import { getDatabase, ref, update } from 'firebase/database';
import { Dispatch } from 'redux';
import { auth, googleAuthProvider } from '../../../firebase/firebase';
import { userGoogleRef } from '../../../helpers/userRef';
import {
  googleSignInFail,
  googleSignInStart,
  googleSignInSuccess
} from '../../action-creators/auth/googleSignInAction';
import { GoogleSignInAction } from '../../types/auth/googleSignInTypes';

const writeUserGoogleData = async (userGoogle: firebase.User) => {
  try {
    const db = getDatabase();
    const userCountRef = ref(db, userGoogleRef(userGoogle));
    await update(userCountRef, {
      userId: userGoogle.uid,
      username: userGoogle.displayName,
      email: userGoogle.email
    });
  } catch (error) {
    const errorMessage = (error as Error).message;
    return errorMessage;
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
      const errorMessage = (error as Error).message;
      dispatch(googleSignInFail(errorMessage));
    }
  };
};
