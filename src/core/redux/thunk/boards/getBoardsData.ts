import { getDatabase, ref, get } from 'firebase/database';
import { Dispatch } from 'redux';
import { boardIdRef } from '../../../helpers/boardRef';
import {
  boardFail,
  boardStart,
  boardSuccess
} from '../../action-creators/boards/boardAction';
import { BoardAction, BoardState } from '../../types/boards/boardTypes';

export const getBoardsData = (boardsId: string[]) => {
  return async (dispatch: Dispatch<BoardAction>): Promise<void> => {
    try {
      dispatch(boardStart());
      const db = getDatabase();
      const boardsData = await Promise.all(
        boardsId.map((boardId) => get(ref(db, boardIdRef(boardId))))
      );
      const allBoards = boardsData.map((snapshot) => snapshot.val());
      const finalBoards = allBoards.reduce((acc, board) => {
        if (board?.boardId) {
          acc[board.boardId] = board;
        }
        return acc;
      }, {} as BoardState);
      dispatch(boardSuccess(finalBoards));
    } catch (error) {
      const errorMessage = (error as Error).message;
      dispatch(boardFail(errorMessage));
    }
  };
};
