import firebase from 'firebase/compat/app';
import { get, getDatabase, ref, remove, set } from 'firebase/database';
import { Dispatch } from 'redux';
import {
  UserAction,
  UserActionTypes,
  UserState
} from '../../types/users/userTypes';

const userStart = (): UserAction => ({
  type: UserActionTypes.USER_START
});

const userSuccess = (user: UserState): UserAction => ({
  type: UserActionTypes.USER_SUCCESS,
  payload: user
});

const userFail = (error: string): UserAction => ({
  type: UserActionTypes.USER_FAIL,
  payload: error
});

const usersRef = (userId: string) => `users/${userId}`;
const usersBoardsRef = (userId: string, boardId: string) =>
  `users/${userId}/boards/${boardId}`;

const writeUserData = (userId: string, username: string, email: string) => {
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

const writeUserBoardData = (
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

const getUserData = (currentUser: firebase.User | null) => {
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

const deleteBoardIdData = (userId: string, boardId: string) => {
  return async (dispatch: Dispatch<UserAction>): Promise<void> => {
    try {
      const db = getDatabase();
      remove(ref(db, usersBoardsRef(userId, boardId)));
    } catch (error) {
      const errorMessage = (error as Error).message;
      dispatch(userFail(errorMessage));
    }
  };
};

export { writeUserData, getUserData, writeUserBoardData, deleteBoardIdData };
