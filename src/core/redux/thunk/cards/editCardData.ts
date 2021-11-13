import { getDatabase, ref, update } from 'firebase/database';
import { Dispatch } from 'redux';
import { cardsIdRef } from '../../../helpers/cardRef';
import { cardFail } from '../../action-creators/cards/cardAction';
import { CardAction } from '../../types/cards/cardTypes';

export const editCardData = (cardId: string, cardTitle: string) => {
  return async (dispatch: Dispatch<CardAction>): Promise<void> => {
    try {
      const db = getDatabase();
      await update(ref(db, cardsIdRef(cardId)), { title: cardTitle });
    } catch (error) {
      const errorMessage = (error as Error).message;
      dispatch(cardFail(errorMessage));
    }
  };
};
