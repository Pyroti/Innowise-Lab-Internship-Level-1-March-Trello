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

const cardsIdRef = (cardId: string) => `cards/${cardId}`;
const boardCardIdRef = (boardId: string, cardId: string) =>
  `boards/${boardId}/cards/${cardId}`;

const writeCardData = (
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

const writeBoardCardData = (boardId: string, cardId: string) => {
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

const getCardsData = (cardsId: string[]) => {
  return async (dispatch: Dispatch<CardAction>): Promise<void> => {
    try {
      dispatch(cardStart());
      const db = getDatabase();
      const cardsData = await Promise.all(
        cardsId.map((cardId) => get(ref(db, cardsIdRef(cardId))))
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
      const errorMessage = (error as Error).message;
      dispatch(cardFail(errorMessage));
    }
  };
};

const deleteCardData = (cardId: string, cards: { [id: string]: CardState }) => {
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

const editCardData = (cardId: string, cardTitle: string) => {
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

const updateCardOrderData = (cardId: string, orderNum: number) => {
  return async (dispatch: Dispatch<CardAction>): Promise<void> => {
    try {
      const db = getDatabase();
      update(ref(db, cardsIdRef(cardId)), { order: orderNum });
    } catch (error) {
      const errorMessage = (error as Error).message;
      dispatch(cardFail(errorMessage));
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
