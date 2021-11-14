import firebase from 'firebase/compat/app';

export const usersRef = (userId: string): string => `users/${userId}`;
export const usersBoardsRef = (userId: string, boardId: string): string =>
  `users/${userId}/boards/${boardId}`;
export const userGoogleRef = (userGoogle: firebase.User): string =>
  `users/${userGoogle.uid}`;
