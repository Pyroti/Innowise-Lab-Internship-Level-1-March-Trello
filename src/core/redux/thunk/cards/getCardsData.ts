import { getDatabase, ref, get } from 'firebase/database';
import { Dispatch } from 'redux';
import { cardsIdRef } from '../../../helpers/cardRef';
import {
  cardFail,
  cardStart,
  cardSuccess
} from '../../action-creators/cards/cardAction';
import { CardAction, CardState } from '../../types/cards/cardTypes';

export const getCardsData = (cardsId: string[]) => {
  return async (dispatch: Dispatch<CardAction>): Promise<void> => {
    try {
      dispatch(cardStart());
      const db = getDatabase();
      const cardsData = await Promise.all(
        cardsId.map((cardId) => get(ref(db, cardsIdRef(cardId))))
      );
      const allCards = cardsData.map((snapshot) => snapshot.val());
      const finalCards = allCards.reduce((acc, card) => {
        if (card?.cardId) {
          acc[card.cardId] = card;
        }
        return acc;
      }, {} as CardState);
      dispatch(cardSuccess(finalCards));
    } catch (error) {
      const errorMessage = (error as Error).message;
      dispatch(cardFail(errorMessage));
    }
  };
};
