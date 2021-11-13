import { get, getDatabase, ref } from 'firebase/database';
import { Dispatch } from 'redux';
import { usersRef } from '../../../constants/usersRef';
import {
  usersFail,
  usersStart,
  usersSuccess
} from '../../action-creators/users/usersAction';
import { UsersAction } from '../../types/users/usersTypes';

export const getUsersData = () => {
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
