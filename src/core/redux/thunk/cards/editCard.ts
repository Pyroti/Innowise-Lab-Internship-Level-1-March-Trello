import { CardState } from '../../types/cards/cardTypes';
import { toast, ToastOptions } from 'react-toastify';
import toastRyles from '../../../constants/toastRules';
import { RootState } from '../../reducer/rootReducer';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { editCardData } from './editCardData';
import { getCardsData } from './getCardsData';

interface CardDate {
  getCardsId: () => string[];
  cardTitle: string;
  card: CardState;
}

const editCardThunk = ({ card, cardTitle, getCardsId }: CardDate) => {
  return async (
    dispatch: ThunkDispatch<RootState, void, Action>
  ): Promise<void> => {
    try {
      dispatch(editCardData(card.cardId, cardTitle));
      dispatch(getCardsData(getCardsId()));
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.warn(errorMessage, toastRyles as ToastOptions);
    }
  };
};

export default editCardThunk;
