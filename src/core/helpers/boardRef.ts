export const boardIdRef = (boardId: string): string => `boards/${boardId}`;
export const boardCardIdRef = (boardId: string, cardId: string): string =>
  `boards/${boardId}/cards/${cardId}`;
