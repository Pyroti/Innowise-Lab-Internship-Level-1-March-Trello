import firebase from 'firebase/compat/app';
import { getDatabase, ref, set } from 'firebase/database';
import { Dispatch } from 'redux';
import { usersBoardsRef } from '../../../helpers/userRef';
import { userFail } from '../../action-creators/users/userAction';
import { UserAction } from '../../types/users/userTypes';

export const writeUserBoardData = (
  currentUser: firebase.User | null,
  boardId: string
) => {
  return async (dispatch: Dispatch<UserAction>): Promise<void> => {
    try {
      const db = getDatabase();
      const usersRef = ref(db, usersBoardsRef(currentUser?.uid, boardId));
      set(usersRef, {
        boardId: boardId
      });
    } catch (error) {
      const errorMessage = (error as Error).message;
      dispatch(userFail(errorMessage));
    }
  };
};
