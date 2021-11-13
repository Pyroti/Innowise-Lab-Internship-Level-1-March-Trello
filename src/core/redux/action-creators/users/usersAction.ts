import {
  UsersAction,
  UsersActionTypes,
  UsersState
} from '../../types/users/usersTypes';

export const usersStart = (): UsersAction => ({
  type: UsersActionTypes.USERS_START
});

export const usersSuccess = (user: {
  [id: string]: UsersState;
}): UsersAction => ({
  type: UsersActionTypes.USERS_SUCCESS,
  payload: user
});

export const usersFail = (error: string): UsersAction => ({
  type: UsersActionTypes.USERS_FAIL,
  payload: error
});
