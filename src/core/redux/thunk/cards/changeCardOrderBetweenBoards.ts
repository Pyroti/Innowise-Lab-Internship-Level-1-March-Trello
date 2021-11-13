import { CardState } from '../../types/cards/cardTypes';
import { toast, ToastOptions } from 'react-toastify';
import toastRyles from '../../../constants/toastRules';
import { RootState } from '../../reducer/rootReducer';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import cardSelector from '../../selectors/cardSelector';
import { deleteCardIdData } from '../boards/deleteCardIdData';
import { deleteCardData } from './deleteCardData';
import { writeCardData } from './writeCardData';
import { writeBoardCardData } from './writeBoardCardData';
import { updateCardOrderData } from './updateCardOrderData';

interface ChangeCardOrder {
  getCardsForCurrentBoard: (boardId: string) => CardState[];
  currentCard: CardState;
  boardId: string;
  cardData: CardState;
  currentBoardIdCard: string;
  updateCardsOrder: (boardId: string) => void;
}

const changeCardOrderBetweenBoardsThunk = ({
  updateCardsOrder,
  currentCard,
  currentBoardIdCard,
  cardData,
  boardId,
  getCardsForCurrentBoard
}: ChangeCardOrder) => {
  return async (
    dispatch: ThunkDispatch<RootState, void, Action>,
    getState: () => RootState
  ): Promise<void> => {
    try {
      const state = getState();
      const { card } = cardSelector(state);
      dispatch(deleteCardData(currentCard.cardId, card));
      dispatch(deleteCardIdData(currentCard.cardId, currentBoardIdCard));
      updateCardsOrder(currentBoardIdCard);
      updateCardsOrder(boardId);
      dispatch(
        writeCardData(
          currentCard.cardId,
          cardData.order,
          currentCard.title,
          'none',
          card
        )
      );
      dispatch(writeBoardCardData(boardId, currentCard.cardId));
      getCardsForCurrentBoard(boardId).map((cardItem) => {
        if (cardItem.order >= cardData.order) {
          dispatch(updateCardOrderData(cardItem.cardId, cardItem.order + 1));
        }
      });
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.warn(errorMessage, toastRyles as ToastOptions);
    }
  };
};

export default changeCardOrderBetweenBoardsThunk;
