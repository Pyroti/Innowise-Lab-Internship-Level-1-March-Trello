import { CardState } from '../../types/cards/cardTypes';
import {
  editCardData,
  getCardsData
} from '../../action-creators/cards/cardAction';
import { toast, ToastOptions } from 'react-toastify';
import toastRyles from '../../../constants/toastRules';
import { RootState } from '../../reducer/rootReducer';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

interface CardDate {
  cardsId: () => string[];
  cardTitle: string;
  card: CardState;
}

const editCardThunk = ({ card, cardTitle, cardsId }: CardDate) => {
  return async (
    dispatch: ThunkDispatch<RootState, void, Action>
  ): Promise<void> => {
    try {
      dispatch(editCardData(card.cardId, cardTitle));
      dispatch(getCardsData(cardsId()));
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.warn(errorMessage, toastRyles as ToastOptions);
    }
  };
};

export default editCardThunk;
