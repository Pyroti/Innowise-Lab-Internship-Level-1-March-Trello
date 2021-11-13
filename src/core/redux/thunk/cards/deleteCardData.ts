import { getDatabase, ref, remove } from 'firebase/database';
import { Dispatch } from 'redux';
import { cardsIdRef } from '../../../helpers/cardRef';
import { cardFail, cardSuccess } from '../../action-creators/cards/cardAction';
import { CardAction, CardState } from '../../types/cards/cardTypes';

export const deleteCardData = (
  cardId: string,
  cards: { [id: string]: CardState }
) => {
  return async (dispatch: Dispatch<CardAction>): Promise<void> => {
    try {
      const db = getDatabase();
      remove(ref(db, cardsIdRef(cardId)));
      delete cards[`${cardId}`];
      dispatch(cardSuccess(cards));
    } catch (error) {
      const errorMessage = (error as Error).message;
      dispatch(cardFail(errorMessage));
    }
  };
};
