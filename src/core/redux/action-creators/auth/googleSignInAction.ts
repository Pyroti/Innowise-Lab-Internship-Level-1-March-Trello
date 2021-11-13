import firebase from 'firebase/compat/app';
import {
  GoogleSignInAction,
  GoogleSignInTypes
} from '../../types/auth/googleSignInTypes';

export const googleSignInStart = (): GoogleSignInAction => ({
  type: GoogleSignInTypes.GOOGLE_SIGN_IN_START
});

export const googleSignInSuccess = (
  user: firebase.User | null
): GoogleSignInAction => ({
  type: GoogleSignInTypes.GOOGLE_SIGN_IN_SUCCESS,
  payload: user
});

export const googleSignInFail = (error: string): GoogleSignInAction => ({
  type: GoogleSignInTypes.GOOGLE_SIGN_IN_FAIL,
  payload: error
});
