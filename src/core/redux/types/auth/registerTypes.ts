import firebase from 'firebase/compat/app';

export enum RegisterActionTypes {
  REGISTER_START = 'REGISTER_START',
  REGISTER_SUCCESS = 'REGISTER_SUCCESS',
  REGISTER_FAIL = 'REGISTER_FAIL'
}

export interface registerStartAction {
  type: RegisterActionTypes.REGISTER_START;
}

interface registerSuccessAction {
  type: RegisterActionTypes.REGISTER_SUCCESS;
  payload: firebase.User | null;
}

interface registerFailAction {
  type: RegisterActionTypes.REGISTER_FAIL;
  payload: string;
}

export type RegisterAction =
  | registerStartAction
  | registerSuccessAction
  | registerFailAction;
