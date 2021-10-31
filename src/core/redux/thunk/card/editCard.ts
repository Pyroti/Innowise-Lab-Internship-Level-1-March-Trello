/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CardState } from '../../types/cards/cardTypes';
import {
  editCardData,
  getCardsData
} from '../../action-creators/cards/cardAction';
import { toast, ToastOptions } from 'react-toastify';
import toastRyles from '../../../constants/toastRules';

interface CardDate {
  cardsId: () => string[];
  cardTitle: string;
  card: CardState;
}

const editCardThunk = (props: CardDate) => {
  return async (dispatch: any): Promise<void> => {
    try {
      const { card, cardTitle, cardsId } = props;
      dispatch(editCardData(card.cardId, cardTitle));
      dispatch(getCardsData(cardsId()));
    } catch (error) {
      const err = (error as Error).message;
      toast.warn(err, toastRyles as ToastOptions);
    }
  };
};

export default editCardThunk;
