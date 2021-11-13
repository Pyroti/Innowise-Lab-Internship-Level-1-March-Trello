import { Dispatch } from 'redux';
import { auth } from '../../../firebase/firebase';
import {
  registerFail,
  registerStart,
  registerSuccess
} from '../../action-creators/auth/registerAction';
import { RegisterAction } from '../../types/auth/registerTypes';

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
      .catch((error: Error) => dispatch(registerFail(error.message)));
  };
};
