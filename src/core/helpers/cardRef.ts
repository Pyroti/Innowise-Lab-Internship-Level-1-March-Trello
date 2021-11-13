export const cardsIdRef = (cardId: string): string => `cards/${cardId}`;
export const boardCardIdRef = (boardId: string, cardId: string): string =>
  `boards/${boardId}/cards/${cardId}`;
