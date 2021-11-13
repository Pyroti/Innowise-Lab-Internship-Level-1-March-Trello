import { LogoutAction, LogoutActionTypes } from '../../types/auth/logoutTypes';

export const logoutStart = (): LogoutAction => ({
  type: LogoutActionTypes.LOGOUT_START
});

export const logoutSuccess = (): LogoutAction => ({
  type: LogoutActionTypes.LOGOUT_SUCCESS
});

export const logoutFail = (error: string): LogoutAction => ({
  type: LogoutActionTypes.LOGOUT_FAIL,
  payload: error
});
