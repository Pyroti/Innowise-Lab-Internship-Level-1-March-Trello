import { CardState } from '../../types/cards/cardTypes';
import { toast, ToastOptions } from 'react-toastify';
import toastRyles from '../../../constants/toastRules';
import { RootState } from '../../reducer/rootReducer';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { updateCardOrderData } from './updateCardOrderData';

interface ChangeCardOrder {
  getCardsForCurrentBoard: (boardId: string) => CardState[];
  currentCard: CardState;
  boardId: string;
  cardData: CardState;
}

const changeCardOrderInBoardThunk = ({
  getCardsForCurrentBoard,
  currentCard,
  boardId,
  cardData
}: ChangeCardOrder) => {
  return async (
    dispatch: ThunkDispatch<RootState, void, Action>
  ): Promise<void> => {
    try {
      getCardsForCurrentBoard(boardId).map((card) => {
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
      const errorMessage = (error as Error).message;
      toast.warn(errorMessage, toastRyles as ToastOptions);
    }
  };
};

export default changeCardOrderInBoardThunk;
