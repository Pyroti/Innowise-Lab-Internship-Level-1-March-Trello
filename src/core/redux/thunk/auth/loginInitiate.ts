import { Dispatch } from 'redux';
import { auth } from '../../../firebase/firebase';
import {
  loginFail,
  loginStart,
  loginSuccess
} from '../../action-creators/auth/loginAction';
import { LoginAction } from '../../types/auth/loginTypes';

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
