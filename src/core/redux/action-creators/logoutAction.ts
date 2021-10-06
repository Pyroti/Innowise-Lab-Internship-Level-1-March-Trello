import { Dispatch } from 'redux';
import { auth } from '../../firebase/firebase';
import { LogoutAction, LogoutActionTypes } from '../types/logoutTypes';

const logoutStart = (): LogoutAction => ({
  type: LogoutActionTypes.LOGOUT_START
});

const logoutSuccess = (): LogoutAction => ({
  type: LogoutActionTypes.LOGOUT_SUCCESS
});

const logoutFail = (error: string): LogoutAction => ({
  type: LogoutActionTypes.LOGOUT_FAIL,
  payload: error
});

export const logoutInitiate = () => {
  return (dispatch: Dispatch<LogoutAction>): void => {
    dispatch(logoutStart());
    auth
      .signOut()
      .then(() => dispatch(logoutSuccess()))
      .catch((error: Error) => dispatch(logoutFail(error.message)));
  };
};
