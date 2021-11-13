import { getDatabase, ref, set } from 'firebase/database';
import { Dispatch } from 'redux';
import { boardCardIdRef } from '../../../helpers/boardRef';
import { cardFail } from '../../action-creators/cards/cardAction';
import { CardAction } from '../../types/cards/cardTypes';

export const writeBoardCardData = (boardId: string, cardId: string) => {
  return async (dispatch: Dispatch<CardAction>): Promise<void> => {
    try {
      const db = getDatabase();
      const usersRef = ref(db, boardCardIdRef(boardId, cardId));
      set(usersRef, {
        cardId: cardId
      });
    } catch (error) {
      const errorMessage = (error as Error).message;
      dispatch(cardFail(errorMessage));
    }
  };
};
