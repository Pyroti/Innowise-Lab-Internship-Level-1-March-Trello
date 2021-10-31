/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CardState } from '../../types/cards/cardTypes';
import { updateCardOrderData } from '../../action-creators/cards/cardAction';
import { toast, ToastOptions } from 'react-toastify';
import toastRyles from '../../../constants/toastRules';

interface changeCardOrder {
  showCards: (boardId: string) => CardState[];
  currentCard: CardState;
  boardId: string;
  cardData: CardState;
}

const changeCardOrderInBoardDnDThunk = (props: changeCardOrder) => {
  return async (dispatch: any): Promise<void> => {
    try {
      const { showCards, currentCard, boardId, cardData } = props;
      showCards(boardId).map((card) => {
        const isCurrentCard = card.cardId === currentCard.cardId;

        const isFirstCard =
          card.order <= cardData.order &&
          card.order > currentCard.order &&
          currentCard.order < cardData.order;

        const isLastCard =
          card.order >= cardData.order &&
          card.order < currentCard.order &&
          currentCard.order > cardData.order;

        if (isCurrentCard) {
          dispatch(updateCardOrderData(card.cardId, cardData.order));
        } else if (isFirstCard) {
          dispatch(updateCardOrderData(card.cardId, card.order - 1));
        } else if (isLastCard) {
          dispatch(updateCardOrderData(card.cardId, card.order + 1));
        }
      });
    } catch (error) {
      const err = (error as Error).message;
      toast.warn(err, toastRyles as ToastOptions);
    }
  };
};

export default changeCardOrderInBoardDnDThunk;
