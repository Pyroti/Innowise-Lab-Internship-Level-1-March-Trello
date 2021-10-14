import firebase from 'firebase/compat/app';
import { Dispatch } from 'redux';
import { auth } from '../../../firebase/firebase';
import { LoginAction, LoginActionTypes } from '../../types/auth/loginTypes';

const loginStart = (): LoginAction => ({
  type: LoginActionTypes.LOGIN_START
});

const loginSuccess = (user: firebase.User): LoginAction => ({
  type: LoginActionTypes.LOGIN_SUCCESS,
  payload: user
});

const loginFail = (error: string): LoginAction => ({
  type: LoginActionTypes.LOGIN_FAIL,
  payload: error
});

export const loginInitiate = (email: string, password: string) => {
  return (dispatch: Dispatch<LoginAction>): void => {
    dispatch(loginStart());
    auth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(loginSuccess(user));
      })
      .catch((error: Error) => dispatch(loginFail(error.message)));
  };
};
