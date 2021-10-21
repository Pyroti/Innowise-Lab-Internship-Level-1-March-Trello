import { get, getDatabase, ref, set } from 'firebase/database';
import { Dispatch } from 'redux';
import {
  CardAction,
  CardActionTypes,
  CardState
} from '../../types/cards/cardTypes';

const cardStart = (): CardAction => ({
  type: CardActionTypes.CARD_START
});

const cardSuccess = (user: { [id: string]: CardState }): CardAction => ({
  type: CardActionTypes.CARD_SUCCSES,
  payload: user
});

const cardFail = (error: string): CardAction => ({
  type: CardActionTypes.CARD_FAIL,
  payload: error
});

const writeCardData = (
  cardId: string | undefined,
  order: number,
  title: string,
  textContent: string,
  cards: { [id: string]: CardState }
) => {
  return async (dispatch: Dispatch<CardAction>): Promise<void> => {
    const card = { cardId, order, title, textContent };
    dispatch(cardStart());
    const db = getDatabase();
    set(ref(db, 'cards/' + cardId), {
      cardId: cardId,
      order: order,
      title: title,
      textContent: textContent
    })
      .then(() => dispatch(cardSuccess({ ...cards, [cardId]: card })))
      .catch((error: Error) => dispatch(cardFail(error.message)));
  };
};

const writeBoardCardData = (boardId: string, cardId: string) => {
  return async (): Promise<void> => {
    const db = getDatabase();
    const usersRef = ref(db, `boards/${boardId}/cards/${cardId}`);
    set(usersRef, {
      cardId: cardId
    });
  };
};

const getCardsData = (cardsId: string[]) => {
  return async (dispatch: Dispatch<CardAction>): Promise<void> => {
    dispatch(cardStart());
    const db = getDatabase();
    const cardsData = await Promise.all(
      cardsId.map((cardId) => get(ref(db, `/cards/${cardId}`)))
    );
    const allcards = cardsData.map((snapshot) => snapshot.val());
    const finalCards = allcards.reduce((acc, card) => {
      if (card?.cardId) {
        acc[card.cardId] = card;
      }
      return acc;
    }, {} as CardState);
    dispatch(cardSuccess(finalCards));
  };
};

export { writeCardData, getCardsData, writeBoardCardData };
