export const usersRef = (userId: string): string => `users/${userId}`;
export const usersBoardsRef = (userId: string, boardId: string): string =>
  `users/${userId}/boards/${boardId}`;
