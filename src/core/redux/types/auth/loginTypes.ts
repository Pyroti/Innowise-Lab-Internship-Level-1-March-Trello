import firebase from 'firebase/compat/app';

export enum LoginActionTypes {
  LOGIN_START = 'LOGIN_START',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAIL = 'LOGIN_FAIL'
}

export interface LoginStartAction {
  type: LoginActionTypes.LOGIN_START;
}

interface LoginSuccessAction {
  type: LoginActionTypes.LOGIN_SUCCESS;
  payload: firebase.User | null;
}

interface LoginFailAction {
  type: LoginActionTypes.LOGIN_FAIL;
  payload: string;
}

export type LoginAction =
  | LoginStartAction
  | LoginSuccessAction
  | LoginFailAction;
