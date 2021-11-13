import { getDatabase, ref, set } from 'firebase/database';
import { Dispatch } from 'redux';
import { usersRef } from '../../../helpers/userRef';
import {
  userFail,
  userStart,
  userSuccess
} from '../../action-creators/users/userAction';
import { UserAction } from '../../types/users/userTypes';

export const writeUserData = (
  userId: string,
  username: string,
  email: string
) => {
  return async (dispatch: Dispatch<UserAction>): Promise<void> => {
    try {
      dispatch(userStart());
      const user = {
        userId,
        username,
        email,
        boards: {
          key: { boardId: '' }
        }
      };
      const db = getDatabase();
      set(ref(db, usersRef(userId)), {
        userId: userId,
        username: username,
        email: email
      });
      dispatch(userSuccess(user));
    } catch (error) {
      const errorMessage = (error as Error).message;
      dispatch(userFail(errorMessage));
    }
  };
};
