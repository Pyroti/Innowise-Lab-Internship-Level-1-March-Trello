/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { toast, ToastOptions } from 'react-toastify';
import toastRyles from '../../../constants/toastRules';
import {
  deleteCardIdData,
  getBoardsData
} from '../../action-creators/boards/boardAction';
import {
  deleteCardData,
  writeBoardCardData,
  writeCardData
} from '../../action-creators/cards/cardAction';
import { BoardState } from '../../types/boards/boardTypes';
import { CardState } from '../../types/cards/cardTypes';
import { UserState } from '../../types/users/userTypes';

interface changeCardOrder {
  setIsUpdateCards: (value: React.SetStateAction<boolean>) => void;
  currentCard: CardState;
  boardData: BoardState;
  currentBordIdcard: string;
  card: {
    [id: string]: CardState;
  };
  user: UserState;
}

const pushTheFirstCardToAnotherBoardThunk = (props: changeCardOrder) => {
  return async (dispatch: any): Promise<void> => {
    try {
      const {
        setIsUpdateCards,
        currentCard,
        currentBordIdcard,
        card,
        boardData,
        user
      } = props;
      dispatch(deleteCardData(currentCard.cardId, card));
      dispatch(deleteCardIdData(currentCard.cardId, currentBordIdcard));
      setIsUpdateCards(true);
      dispatch(
        writeCardData(currentCard.cardId, 1, currentCard.title, 'none', card)
      );
      dispatch(writeBoardCardData(boardData.boardId, currentCard.cardId));
      dispatch(getBoardsData(Object.keys(user.boards)));
    } catch (error) {
      const err = (error as Error).message;
      toast.warn(err, toastRyles as ToastOptions);
    }
  };
};

export default pushTheFirstCardToAnotherBoardThunk;
