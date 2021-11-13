import { CardState } from '../../types/cards/cardTypes';
import { toast, ToastOptions } from 'react-toastify';
import toastRyles from '../../../constants/toastRules';
import { RootState } from '../../reducer/rootReducer';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import cardSelector from '../../selectors/cardSelector';
import { deleteCardIdData } from '../boards/deleteCardIdData';
import { deleteCardData } from './deleteCardData';
import { getCardsData } from './getCardsData';

interface CardDate {
  updateCardsOrder: (boardsId: string) => void;
  getCardsId: () => string[];
  boardId: string;
  card: CardState;
}

const deleteCardThunk = ({
  updateCardsOrder,
  card,
  boardId,
  getCardsId
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
      dispatch(getCardsData(getCardsId()));
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.warn(errorMessage, toastRyles as ToastOptions);
    }
  };
};

export default deleteCardThunk;
