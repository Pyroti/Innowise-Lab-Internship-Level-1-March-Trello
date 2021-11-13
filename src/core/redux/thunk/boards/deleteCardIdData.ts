import { getDatabase, ref, remove } from 'firebase/database';
import { Dispatch } from 'redux';
import { boardCardIdRef } from '../../../helpers/boardRef';
import { boardFail } from '../../action-creators/boards/boardAction';
import { BoardAction } from '../../types/boards/boardTypes';

export const deleteCardIdData = (cardId: string, boardId: string) => {
  return async (dispatch: Dispatch<BoardAction>): Promise<void> => {
    try {
      const db = getDatabase();
      remove(ref(db, boardCardIdRef(boardId, cardId)));
    } catch (error) {
      const errorMessage = (error as Error).message;
      dispatch(boardFail(errorMessage));
    }
  };
};
