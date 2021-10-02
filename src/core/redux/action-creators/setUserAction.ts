import firebase from 'firebase/compat/app';
import { SetUserActionType, SetUserTypes } from '../types/setUserTypes';

export const setUser = (user: firebase.User | null): SetUserActionType => ({
  type: SetUserTypes.SET_USER,
  payload: user
});
