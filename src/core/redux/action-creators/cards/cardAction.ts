import { get, getDatabase, ref, remove, set, update } from 'firebase/database';
import { Dispatch } from 'redux';
import {
  CardAction,
  CardActionTypes,
  CardState
} from '../../types/cards/cardTypes';

const cardStart = (): CardAction => ({
  type: CardActionTypes.CARD_START
});

const cardSuccess = (card: { [id: string]: CardState }): CardAction => ({
  type: CardActionTypes.CARD_SUCCSES,
  payload: card
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
    try {
      const card = { cardId, order, title, textContent };
      dispatch(cardStart());
      const db = getDatabase();
      const cardsIdRef = `cards/${cardId}`;
      await set(ref(db, cardsIdRef), {
        cardId: cardId,
        order: order,
        title: title,
        textContent: textContent
      });
      dispatch(cardSuccess({ ...cards, [cardId]: card }));
    } catch (error) {
      const err = (error as Error).message;
      dispatch(cardFail(err));
    }
  };
};

const writeBoardCardData = (boardId: string, cardId: string) => {
  return async (dispatch: Dispatch<CardAction>): Promise<void> => {
    try {
      const db = getDatabase();
      const boardCardIdRef = `boards/${boardId}/cards/${cardId}`;
      const usersRef = ref(db, boardCardIdRef);
      await set(usersRef, {
        cardId: cardId
      });
    } catch (error) {
      const err = (error as Error).message;
      dispatch(cardFail(err));
    }
  };
};

const getCardsData = (cardsId: string[]) => {
  return async (dispatch: Dispatch<CardAction>): Promise<void> => {
    try {
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
    } catch (error) {
      const err = (error as Error).message;
      dispatch(cardFail(err));
    }
  };
};

const deleteCardData = (cardId: string, cards: { [id: string]: CardState }) => {
  return async (dispatch: Dispatch<CardAction>): Promise<void> => {
    try {
      const db = getDatabase();
      const cardsIdRef = `cards/${cardId}`;
      await remove(ref(db, cardsIdRef));
      delete cards[`${cardId}`];
      dispatch(cardSuccess(cards));
    } catch (error) {
      const err = (error as Error).message;
      dispatch(cardFail(err));
    }
  };
};

const editCardData = (cardId: string, cardTitle: string) => {
  return async (dispatch: Dispatch<CardAction>): Promise<void> => {
    try {
      const db = getDatabase();
      const cardsIdRef = `cards/${cardId}`;
      await update(ref(db, cardsIdRef), { title: cardTitle });
    } catch (error) {
      const err = (error as Error).message;
      dispatch(cardFail(err));
    }
  };
};

const updateCardOrderData = (cardId: string, orderNum: number) => {
  return async (dispatch: Dispatch<CardAction>): Promise<void> => {
    try {
      const db = getDatabase();
      const cardsIdRef = `cards/${cardId}`;
      await update(ref(db, cardsIdRef), { order: orderNum });
    } catch (error) {
      const err = (error as Error).message;
      dispatch(cardFail(err));
    }
  };
};

export {
  writeCardData,
  getCardsData,
  writeBoardCardData,
  deleteCardData,
  editCardData,
  updateCardOrderData
};
