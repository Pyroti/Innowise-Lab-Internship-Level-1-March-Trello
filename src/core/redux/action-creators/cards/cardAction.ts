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
    const card = { cardId, order, title, textContent };
    dispatch(cardStart());
    const db = getDatabase();
    set(ref(db, `cards/${cardId}`), {
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
    console.log('allcards', allcards);
    const finalCards = allcards.reduce((acc, card) => {
      if (card?.cardId) {
        acc[card.cardId] = card;
      }
      return acc;
    }, {} as CardState);
    console.log('finalCards', finalCards);
    dispatch(cardSuccess(finalCards));
  };
};

const deleteCardData = (cardId: string, cards: { [id: string]: CardState }) => {
  return async (dispatch: Dispatch<CardAction>): Promise<void> => {
    const db = getDatabase();
    remove(ref(db, `cards/${cardId}`));
    delete cards[`${cardId}`];
    dispatch(cardSuccess(cards));
  };
};

const editCardData = (cardId: string, cardTitle: string) => {
  return (): void => {
    const db = getDatabase();
    update(ref(db, `cards/${cardId}`), { title: cardTitle });
  };
};

const updateCardOrderData = (cardId: string, orderNum: number) => {
  return (): void => {
    const db = getDatabase();
    console.log('ooop', cardId, orderNum);
    update(ref(db, `cards/${cardId}`), { order: orderNum });
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
