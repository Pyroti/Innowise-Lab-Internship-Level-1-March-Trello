import firebase from 'firebase/compat/app';

export enum SetUserTypes {
  SET_USER = 'SET_USER'
}

interface SetUserAction {
  type: string;
  payload: firebase.User | null;
}

export type SetUserActionType = SetUserAction;
