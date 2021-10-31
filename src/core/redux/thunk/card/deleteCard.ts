/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CardState } from '../../types/cards/cardTypes';
import { deleteCardIdData } from '../../action-creators/boards/boardAction';
import {
  deleteCardData,
  getCardsData
} from '../../action-creators/cards/cardAction';
import { toast, ToastOptions } from 'react-toastify';
import toastRyles from '../../../constants/toastRules';

interface CardDate {
  updateCardsOrder: (boardsId: string) => void;
  cardsId: () => string[];
  boardId: string;
  card: CardState;
  cards: {
    [id: string]: CardState;
  };
}

const deleteCardThunk = (props: CardDate) => {
  return async (dispatch: any): Promise<void> => {
    try {
      const { updateCardsOrder, card, cards, boardId, cardsId } = props;
      dispatch(deleteCardData(card.cardId, cards));
      updateCardsOrder(boardId);
      dispatch(deleteCardIdData(card.cardId, boardId));
      dispatch(getCardsData(cardsId()));
    } catch (error) {
      const err = (error as Error).message;
      toast.warn(err, toastRyles as ToastOptions);
    }
  };
};

export default deleteCardThunk;
