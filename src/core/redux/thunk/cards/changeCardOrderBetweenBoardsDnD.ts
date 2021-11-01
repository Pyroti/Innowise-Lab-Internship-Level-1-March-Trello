import { CardState } from '../../types/cards/cardTypes';
import {
  deleteCardData,
  updateCardOrderData,
  writeBoardCardData,
  writeCardData
} from '../../action-creators/cards/cardAction';
import { toast, ToastOptions } from 'react-toastify';
import toastRyles from '../../../constants/toastRules';
import { deleteCardIdData } from '../../action-creators/boards/boardAction';
import { RootState } from '../../reducer/rootReducer';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import cardSelector from '../../selectors/cardSelector';

interface ChangeCardOrder {
  showCards: (boardId: string) => CardState[];
  currentCard: CardState;
  boardId: string;
  cardData: CardState;
  currentBordIdcard: string;
  updateCardsOrder: (boardId: string) => void;
}

const changeCardOrderBetweenBoardsDnDThunk = ({
  updateCardsOrder,
  currentCard,
  currentBordIdcard,
  cardData,
  boardId,
  showCards
}: ChangeCardOrder) => {
  return async (
    dispatch: ThunkDispatch<RootState, void, Action>,
    getState: () => RootState
  ): Promise<void> => {
    try {
      const state = getState();
      const { card } = cardSelector(state);
      dispatch(deleteCardData(currentCard.cardId, card));
      dispatch(deleteCardIdData(currentCard.cardId, currentBordIdcard));
      updateCardsOrder(currentBordIdcard);
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
      showCards(boardId).map((cardItem) => {
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

export default changeCardOrderBetweenBoardsDnDThunk;
