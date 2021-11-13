import firebase from 'firebase/compat/app';
import { getDatabase, ref, get } from 'firebase/database';
import { Dispatch } from 'redux';
import { usersRef } from '../../../helpers/userRef';
import {
  userFail,
  userStart,
  userSuccess
} from '../../action-creators/users/userAction';
import { UserAction } from '../../types/users/userTypes';

export const getUserData = (currentUser: firebase.User | null) => {
  return async (dispatch: Dispatch<UserAction>): Promise<void> => {
    try {
      dispatch(userStart());
      const db = getDatabase();
      const userCountRef = ref(db, usersRef(currentUser?.uid));
      const snapshot = await get(userCountRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        dispatch(userSuccess(data));
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      dispatch(userFail(errorMessage));
    }
  };
};
