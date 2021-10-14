import firebase from 'firebase/compat/app';
import { SetUserActionType, SetUserTypes } from '../../types/auth/setUserTypes';

const setUserInitiate = (user: firebase.User | null): SetUserActionType => ({
  type: SetUserTypes.SET_USER,
  payload: user
});

export default setUserInitiate;
