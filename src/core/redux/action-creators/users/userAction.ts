import firebase from 'firebase/compat/app';
import { get, getDatabase, ref, set } from 'firebase/database';
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
    set(ref(db, 'users/' + userId), {
      userId: userId,
      username: username,
      email: email
    })
      .then(() => dispatch(userSuccess(user)))
      .catch((error: Error) => dispatch(userFail(error.message)));
  };
};

const writeUserBoardData = (
  currentUser: firebase.User | null,
  boardId: string
) => {
  return async (): Promise<void> => {
    // const user = { userId, username, email };
    const db = getDatabase();
    const usersRef = ref(db, `users/${currentUser?.uid}/boards/${boardId}`);
    set(usersRef, {
      boardId: boardId
    });
    // .then(() => dispatch(userSet(user)))
    // .catch((error: Error) => dispatch(userFail(error.message)));
  };
};

const getUserData = (currentUser: firebase.User | null) => {
  return async (dispatch: Dispatch<UserAction>): Promise<void> => {
    dispatch(userStart());
    const db = getDatabase();
    const userCountRef = ref(db, 'users/' + currentUser?.uid);
    get(userCountRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          dispatch(userSuccess(data));
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        const err = (error as Error).message;
        dispatch(userFail(err));
      });
  };
};

export { writeUserData, getUserData, writeUserBoardData };
