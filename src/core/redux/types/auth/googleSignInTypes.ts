import firebase from 'firebase/compat/app';

export enum GoogleSignInTypes {
  GOOGLE_SIGN_IN_START = 'GOOGLE_SIGN_IN_START',
  GOOGLE_SIGN_IN_SUCCESS = 'GOOGLE_SIGN_IN_SUCCESS',
  GOOGLE_SIGN_IN_FAIL = 'GOOGLE_SIGN_IN_FAIL'
}

export interface GoogleSignInStartAction {
  type: GoogleSignInTypes.GOOGLE_SIGN_IN_START;
}

interface GoogleSignInSuccessAction {
  type: GoogleSignInTypes.GOOGLE_SIGN_IN_SUCCESS;
  payload: firebase.User | null;
}

interface GoogleSignInFailAction {
  type: GoogleSignInTypes.GOOGLE_SIGN_IN_FAIL;
  payload: string;
}

export type GoogleSignInAction =
  | GoogleSignInStartAction
  | GoogleSignInSuccessAction
  | GoogleSignInFailAction;
