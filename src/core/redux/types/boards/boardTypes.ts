export enum BoardActionTypes {
  BOARD_START = 'BOARD_START',
  BOARD_SUCCESS = 'BOARD_SUCCESS',
  BOARD_FAIL = 'BOARD_FAIL'
}

export interface BoardState {
  boardId: string;
  title: string;
  order: number;
  cards: {
    [key: string]: { cardId: string };
  };
}

interface BoardStartAction {
  type: BoardActionTypes.BOARD_START;
}

interface BoardSuccessAction {
  type: BoardActionTypes.BOARD_SUCCESS;
  payload: {
    [id: string]: BoardState;
  };
}

interface BoardFailAction {
  type: BoardActionTypes.BOARD_FAIL;
  payload: string;
}

export type BoardAction =
  | BoardStartAction
  | BoardSuccessAction
  | BoardFailAction;
