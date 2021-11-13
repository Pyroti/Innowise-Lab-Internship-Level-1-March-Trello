import {
  BoardAction,
  BoardActionTypes,
  BoardState
} from '../../types/boards/boardTypes';

export const boardStart = (): BoardAction => ({
  type: BoardActionTypes.BOARD_START
});

export const boardSuccess = (board: {
  [id: string]: BoardState;
}): BoardAction => ({
  type: BoardActionTypes.BOARD_SUCCESS,
  payload: board
});

export const boardFail = (error: string): BoardAction => ({
  type: BoardActionTypes.BOARD_FAIL,
  payload: error
});
