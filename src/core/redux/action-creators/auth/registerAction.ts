import firebase from 'firebase/compat/app';
import {
  RegisterAction,
  RegisterActionTypes
} from '../../types/auth/registerTypes';

export const registerStart = (): RegisterAction => ({
  type: RegisterActionTypes.REGISTER_START
});

export const registerSuccess = (
  user: firebase.User | null
): RegisterAction => ({
  type: RegisterActionTypes.REGISTER_SUCCESS,
  payload: user
});

export const registerFail = (error: string): RegisterAction => ({
  type: RegisterActionTypes.REGISTER_FAIL,
  payload: error
});
