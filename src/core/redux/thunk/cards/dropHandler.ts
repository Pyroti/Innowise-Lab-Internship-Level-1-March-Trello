/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CardState } from '../../types/cards/cardTypes';
import { getBoardsData } from '../../action-creators/boards/boardAction';
import { toast, ToastOptions } from 'react-toastify';
import toastRyles from '../../../constants/toastRules';
import { UserState } from '../../types/users/userTypes';

interface CardDate {
  currentItemNameId: string;
  cardNameId: string;
  currentBordIdcard: string;
  boardId: string;
  user: UserState;
  cardData: CardState;
  changeCardOrderInBoardDnD: (cardData: CardState) => void;
  changeCardOrderBetweenBoardsDnD: (cardData: CardState) => void;
}

const dropHandlerThunk = (props: CardDate) => {
  return async (dispatch: any): Promise<void> => {
    try {
      const {
        currentItemNameId,
        cardNameId,
        currentBordIdcard,
        changeCardOrderInBoardDnD,
        cardData,
        boardId,
        changeCardOrderBetweenBoardsDnD,
        user
      } = props;
      const isCard = currentItemNameId === cardNameId;
      const isCurrentBoard = currentBordIdcard === boardId;
      if (isCard) {
        if (isCurrentBoard) {
          changeCardOrderInBoardDnD(cardData);
        } else {
          changeCardOrderBetweenBoardsDnD(cardData);
        }
        dispatch(getBoardsData(Object.keys(user.boards)));
      }
    } catch (error) {
      const err = (error as Error).message;
      toast.warn(err, toastRyles as ToastOptions);
    }
  };
};

export default dropHandlerThunk;
