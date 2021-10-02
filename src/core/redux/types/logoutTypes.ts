export enum LogoutActionTypes {
  LOGOUT_START = 'LOGOUT_START',
  LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
  LOGOUT_FAIL = 'LOGOUT_FAIL'
}

export interface LogoutStartAction {
  type: LogoutActionTypes.LOGOUT_START;
}

interface LogoutSuccessAction {
  type: LogoutActionTypes.LOGOUT_SUCCESS;
}

interface LogoutFailAction {
  type: LogoutActionTypes.LOGOUT_FAIL;
  payload: string;
}

export type LogoutAction =
  | LogoutStartAction
  | LogoutSuccessAction
  | LogoutFailAction;
