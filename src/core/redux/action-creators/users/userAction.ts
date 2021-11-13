import {
  UserAction,
  UserActionTypes,
  UserState
} from '../../types/users/userTypes';

export const userStart = (): UserAction => ({
  type: UserActionTypes.USER_START
});

export const userSuccess = (user: UserState): UserAction => ({
  type: UserActionTypes.USER_SUCCESS,
  payload: user
});

export const userFail = (error: string): UserAction => ({
  type: UserActionTypes.USER_FAIL,
  payload: error
});
