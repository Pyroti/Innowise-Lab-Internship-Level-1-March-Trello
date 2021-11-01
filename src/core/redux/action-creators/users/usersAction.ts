import { get, getDatabase, ref } from 'firebase/database';
import { Dispatch } from 'redux';
import {
  UsersAction,
  UsersActionTypes,
  UsersState
} from '../../types/users/usersTypes';

const usersStart = (): UsersAction => ({
  type: UsersActionTypes.USERS_START
});

const usersSuccess = (user: { [id: string]: UsersState }): UsersAction => ({
  type: UsersActionTypes.USERS_SUCCESS,
  payload: user
});

const usersFail = (error: string): UsersAction => ({
  type: UsersActionTypes.USERS_FAIL,
  payload: error
});

const usersRef = `users/`;

const getUsersData = () => {
  return async (dispatch: Dispatch<UsersAction>): Promise<void> => {
    try {
      dispatch(usersStart());
      const db = getDatabase();
      const userCountRef = ref(db, usersRef);
      const snapshot = await get(userCountRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        dispatch(usersSuccess(data));
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      dispatch(usersFail(errorMessage));
    }
  };
};

export { getUsersData };
