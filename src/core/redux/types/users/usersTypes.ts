export enum UsersActionTypes {
  USERS_START = 'USERS_START',
  USERS_SUCCESS = 'USERS_SUCCESS',
  USERS_FAIL = 'USERS_FAIL'
}

export interface UsersState {
  userId: string;
  username: string;
  email: string;
  boards: {
    [key: string]: { boardId: string };
  };
}

export interface UsersStartAction {
  type: UsersActionTypes.USERS_START;
}

interface UsersSuccessAction {
  type: UsersActionTypes.USERS_SUCCESS;
  payload: {
    [id: string]: UsersState;
  };
}

interface UsersFailAction {
  type: UsersActionTypes.USERS_FAIL;
  payload: string;
}

export type UsersAction =
  | UsersStartAction
  | UsersSuccessAction
  | UsersFailAction;
