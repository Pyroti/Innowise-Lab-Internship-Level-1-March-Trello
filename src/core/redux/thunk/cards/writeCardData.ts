import { getDatabase, ref, set } from 'firebase/database';
import { Dispatch } from 'redux';
import { cardsIdRef } from '../../../helpers/cardRef';
import {
  cardFail,
  cardStart,
  cardSuccess
} from '../../action-creators/cards/cardAction';
import { CardAction, CardState } from '../../types/cards/cardTypes';

export const writeCardData = (
  cardId: string,
  order: number,
  title: string,
  textContent: string,
  cards: { [id: string]: CardState }
) => {
  return async (dispatch: Dispatch<CardAction>): Promise<void> => {
    try {
      const card = { cardId, order, title, textContent };
      dispatch(cardStart());
      const db = getDatabase();
      await set(ref(db, cardsIdRef(cardId)), {
        cardId: cardId,
        order: order,
        title: title,
        textContent: textContent
      });
      dispatch(cardSuccess({ ...cards, [cardId]: card }));
    } catch (error) {
      const errorMessage = (error as Error).message;
      dispatch(cardFail(errorMessage));
    }
  };
};
