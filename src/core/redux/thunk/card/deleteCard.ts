import { CardState } from '../../types/cards/cardTypes';
import { deleteCardIdData } from '../../action-creators/boards/boardAction';
import {
  deleteCardData,
  getCardsData
} from '../../action-creators/cards/cardAction';
import { toast, ToastOptions } from 'react-toastify';
import toastRyles from '../../../constants/toastRules';
import { RootState } from '../../reducer/rootReducer';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import cardSelector from '../../selectors/cardSelector';

interface CardDate {
  updateCardsOrder: (boardsId: string) => void;
  cardsId: () => string[];
  boardId: string;
  card: CardState;
}

const deleteCardThunk = ({
  updateCardsOrder,
  card,
  boardId,
  cardsId
}: CardDate) => {
  return async (
    dispatch: ThunkDispatch<RootState, void, Action>,
    getState: () => RootState
  ): Promise<void> => {
    try {
      const state = getState();
      const cards = cardSelector(state).card;
      dispatch(deleteCardData(card.cardId, cards));
      updateCardsOrder(boardId);
      dispatch(deleteCardIdData(card.cardId, boardId));
      dispatch(getCardsData(cardsId()));
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.warn(errorMessage, toastRyles as ToastOptions);
    }
  };
};

export default deleteCardThunk;
