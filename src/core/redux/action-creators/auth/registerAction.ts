import firebase from 'firebase/compat/app';
import { Dispatch } from 'redux';
import { auth } from '../../../firebase/firebase';
import {
  RegisterAction,
  RegisterActionTypes
} from '../../types/auth/registerTypes';

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
  return async (dispatch: Dispatch<RegisterAction>): Promise<void> => {
    dispatch(registerStart());
    await auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        user?.updateProfile({
          displayName
        });
        dispatch(registerSuccess(user));
      })
      .catch((error: Error) => dispatch(registerFail(error.message)));
  };
};
