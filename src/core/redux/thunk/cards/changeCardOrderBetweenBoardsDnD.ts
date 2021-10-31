/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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

interface changeCardOrder {
  showCards: (boardId: string) => CardState[];
  currentCard: CardState;
  boardId: string;
  cardData: CardState;
  currentBordIdcard: string;
  updateCardsOrder: (boardId: string) => void;
  card: {
    [id: string]: CardState;
  };
}

const changeCardOrderBetweenBoardsDnDThunk = (props: changeCardOrder) => {
  return async (dispatch: any): Promise<void> => {
    try {
      const {
        updateCardsOrder,
        currentCard,
        card,
        currentBordIdcard,
        cardData,
        boardId,
        showCards
      } = props;
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
      const err = (error as Error).message;
      toast.warn(err, toastRyles as ToastOptions);
    }
  };
};

export default changeCardOrderBetweenBoardsDnDThunk;
