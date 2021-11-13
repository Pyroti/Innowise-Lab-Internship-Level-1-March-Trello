import { getDatabase, ref, update } from 'firebase/database';
import { Dispatch } from 'redux';
import { boardIdRef } from '../../../helpers/boardRef';
import { boardFail } from '../../action-creators/boards/boardAction';
import { BoardAction } from '../../types/boards/boardTypes';

export const updateBoardOrderData = (boardId: string, orderNum: number) => {
  return async (dispatch: Dispatch<BoardAction>): Promise<void> => {
    try {
      const db = getDatabase();
      update(ref(db, boardIdRef(boardId)), { order: orderNum });
    } catch (error) {
      const errorMessage = (error as Error).message;
      dispatch(boardFail(errorMessage));
    }
  };
};
