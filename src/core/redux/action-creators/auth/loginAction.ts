import firebase from 'firebase/compat/app';
import { LoginAction, LoginActionTypes } from '../../types/auth/loginTypes';

export const loginStart = (): LoginAction => ({
  type: LoginActionTypes.LOGIN_START
});

export const loginSuccess = (user: firebase.User): LoginAction => ({
  type: LoginActionTypes.LOGIN_SUCCESS,
  payload: user
});

export const loginFail = (error: string): LoginAction => ({
  type: LoginActionTypes.LOGIN_FAIL,
  payload: error
});
