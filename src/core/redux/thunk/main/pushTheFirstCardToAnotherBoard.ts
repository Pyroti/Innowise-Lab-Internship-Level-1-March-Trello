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
import { RootState } from '../../reducer/rootReducer';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import userSelector from '../../selectors/userSelector';
import cardSelector from '../../selectors/cardSelector';

interface ChangeCardOrder {
  setIsUpdateCards: (value: React.SetStateAction<boolean>) => void;
  currentCard: CardState;
  boardData: BoardState;
  currentBordIdcard: string;
}

const pushTheFirstCardToAnotherBoardThunk = ({
  setIsUpdateCards,
  currentCard,
  currentBordIdcard,
  boardData
}: ChangeCardOrder) => {
  return async (
    dispatch: ThunkDispatch<RootState, void, Action>,
    getState: () => RootState
  ): Promise<void> => {
    try {
      const state = getState();
      const { user } = userSelector(state);
      const { card } = cardSelector(state);
      dispatch(deleteCardData(currentCard.cardId, card));
      dispatch(deleteCardIdData(currentCard.cardId, currentBordIdcard));
      setIsUpdateCards(true);
      dispatch(
        writeCardData(currentCard.cardId, 1, currentCard.title, 'none', card)
      );
      dispatch(writeBoardCardData(boardData.boardId, currentCard.cardId));
      dispatch(getBoardsData(Object.keys(user.boards)));
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.warn(errorMessage, toastRyles as ToastOptions);
    }
  };
};

export default pushTheFirstCardToAnotherBoardThunk;
