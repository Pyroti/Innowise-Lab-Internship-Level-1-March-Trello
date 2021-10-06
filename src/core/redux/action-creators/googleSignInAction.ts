import firebase from 'firebase/compat/app';
import { Dispatch } from 'redux';
import { auth, googleAuthProvider } from '../../firebase/firebase';
import {
  GoogleSignInAction,
  GoogleSignInTypes
} from '../types/googleSignInTypes';

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

export const googleSignInInitiate = () => {
  return (dispatch: Dispatch<GoogleSignInAction>): void => {
    dispatch(googleSignInStart());
    auth
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        dispatch(googleSignInSuccess(user));
      })
      .catch((error: Error) => dispatch(googleSignInFail(error.message)));
  };
};
