export enum UserActionTypes {
  USER_START = 'USER_START',
  USER_SUCCESS = 'USER_SUCCESS',
  USER_FAIL = 'USER_FAIL'
}

export interface UserState {
  userId: string;
  username: string;
  email: string;
  boards: {
    [key: string]: { boardId: string };
  };
}

export interface UserStartAction {
  type: UserActionTypes.USER_START;
}

interface UserSuccessAction {
  type: UserActionTypes.USER_SUCCESS;
  payload: UserState;
}

interface UserFailAction {
  type: UserActionTypes.USER_FAIL;
  payload: string;
}

export type UserAction = UserStartAction | UserSuccessAction | UserFailAction;
