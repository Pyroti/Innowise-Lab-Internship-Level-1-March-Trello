import { getDatabase, ref, set } from 'firebase/database';
import { Dispatch } from 'redux';
import { boardIdRef } from '../../../helpers/boardRef';
import {
  boardFail,
  boardStart,
  boardSuccess
} from '../../action-creators/boards/boardAction';
import { BoardAction, BoardState } from '../../types/boards/boardTypes';

export const writeBoardData = (
  boardId: string,
  order: number,
  title: string,
  boards: { [id: string]: BoardState }
) => {
  return async (dispatch: Dispatch<BoardAction>): Promise<void> => {
    try {
      const board = {
        boardId,
        order,
        title,
        cards: {
          key: { cardId: '' }
        }
      };
      dispatch(boardStart());
      const db = getDatabase();
      set(ref(db, boardIdRef(boardId)), {
        boardId: boardId,
        order: order,
        title: title
      });
      dispatch(boardSuccess({ ...boards, [boardId]: board }));
    } catch (error) {
      const errorMessage = (error as Error).message;
      dispatch(boardFail(errorMessage));
    }
  };
};
