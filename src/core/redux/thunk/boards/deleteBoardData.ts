import { getDatabase, ref, remove } from 'firebase/database';
import { Dispatch } from 'redux';
import { boardIdRef } from '../../../helpers/boardRef';
import {
  boardFail,
  boardStart,
  boardSuccess
} from '../../action-creators/boards/boardAction';
import { BoardAction, BoardState } from '../../types/boards/boardTypes';

export const deleteBoardData = (
  boardId: string,
  boards: { [id: string]: BoardState }
) => {
  return async (dispatch: Dispatch<BoardAction>): Promise<void> => {
    try {
      dispatch(boardStart());
      const db = getDatabase();
      remove(ref(db, boardIdRef(boardId)));
      delete boards[`${boardId}`];
      dispatch(boardSuccess(boards));
    } catch (error) {
      const errorMessage = (error as Error).message;
      dispatch(boardFail(errorMessage));
    }
  };
};
