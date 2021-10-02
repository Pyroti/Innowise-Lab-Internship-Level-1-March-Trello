import firebase from 'firebase/compat/app';
import { Dispatch } from 'redux';
import { auth } from '../../firebase/firebase';
import { RegisterAction, RegisterActionTypes } from '../types/registerTypes';

const registerStart = (): RegisterAction => ({
  type: RegisterActionTypes.REGISTER_START
});

const registerSuccess = (user: firebase.User | null): RegisterAction => ({
  type: RegisterActionTypes.REGISTER_SUCCESS,
  payload: user
});

const registerFail = (error: string): RegisterAction => ({
  type: RegisterActionTypes.REGISTER_FAIL,
  payload: error
});

export const registerInitiate = (
  email: string,
  password: string,
  displayName: string
) => {
  return (dispatch: Dispatch<RegisterAction>): void => {
    dispatch(registerStart());
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        user?.updateProfile({
          displayName
        });
        dispatch(registerSuccess(user));
      })
      .catch((error: { message: string }) =>
        dispatch(registerFail(error.message))
      );
  };
};
