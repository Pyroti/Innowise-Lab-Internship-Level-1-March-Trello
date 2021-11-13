import { Dispatch } from 'redux';
import { auth } from '../../../firebase/firebase';
import {
  logoutFail,
  logoutStart,
  logoutSuccess
} from '../../action-creators/auth/logoutAction';
import { LogoutAction } from '../../types/auth/logoutTypes';

export const logoutInitiate = () => {
  return (dispatch: Dispatch<LogoutAction>): void => {
    dispatch(logoutStart());
    auth
      .signOut()
      .then(() => dispatch(logoutSuccess()))
      .catch((error: Error) => dispatch(logoutFail(error.message)));
  };
};
