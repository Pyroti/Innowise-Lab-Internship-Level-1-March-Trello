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
      const usersRef = `users/${userId}`;
      await set(ref(db, usersRef), {
        userId: userId,
        username: username,
        email: email
      });
      dispatch(userSuccess(user));
    } catch (error) {
      const err = (error as Error).message;
      dispatch(userFail(err));
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
      const usersBoardsRef = `users/${currentUser?.uid}/boards/${boardId}`;
      const usersRef = ref(db, usersBoardsRef);
      await set(usersRef, {
        boardId: boardId
      });
    } catch (error) {
      const err = (error as Error).message;
      dispatch(userFail(err));
    }
  };
};

const getUserData = (currentUser: firebase.User | null) => {
  return async (dispatch: Dispatch<UserAction>): Promise<void> => {
    try {
      dispatch(userStart());
      const db = getDatabase();
      const usersRef = `users/${currentUser?.uid}`;
      const userCountRef = ref(db, usersRef);
      const snapshot = await get(userCountRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        dispatch(userSuccess(data));
      }
    } catch (error) {
      const err = (error as Error).message;
      dispatch(userFail(err));
    }
  };
};

const deleteBoardIdData = (userId: string, boardId: string) => {
  return async (dispatch: Dispatch<UserAction>): Promise<void> => {
    try {
      const db = getDatabase();
      const usersBoardsRef = `users/${userId}/boards/${boardId}`;
      await remove(ref(db, usersBoardsRef));
    } catch (error) {
      const err = (error as Error).message;
      dispatch(userFail(err));
    }
  };
};

export { writeUserData, getUserData, writeUserBoardData, deleteBoardIdData };
