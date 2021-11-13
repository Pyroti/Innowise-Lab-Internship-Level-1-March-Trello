import { CardState } from '../../types/cards/cardTypes';
import { toast, ToastOptions } from 'react-toastify';
import toastRyles from '../../../constants/toastRules';
import { RootState } from '../../reducer/rootReducer';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import userSelector from '../../selectors/userSelector';
import { getBoardsData } from '../boards/getBoardsData';

interface CardDate {
  currentItemNameId: string;
  cardNameId: string;
  currentBoardIdCard: string;
  boardId: string;
  cardData: CardState;
  changeCardOrderInBoard: (cardData: CardState) => void;
  changeCardOrderBetweenBoards: (cardData: CardState) => void;
}

const dropHandlerThunk = ({
  currentItemNameId,
  cardNameId,
  currentBoardIdCard,
  changeCardOrderInBoard,
  cardData,
  boardId,
  changeCardOrderBetweenBoards
}: CardDate) => {
  return async (
    dispatch: ThunkDispatch<RootState, void, Action>,
    getState: () => RootState
  ): Promise<void> => {
    try {
      const state = getState();
      const { user } = userSelector(state);
      const isCard = currentItemNameId === cardNameId;
      const isCurrentBoard = currentBoardIdCard === boardId;
      if (isCard) {
        if (isCurrentBoard) {
          changeCardOrderInBoard(cardData);
        } else {
          changeCardOrderBetweenBoards(cardData);
        }
        dispatch(getBoardsData(Object.keys(user.boards)));
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.warn(errorMessage, toastRyles as ToastOptions);
    }
  };
};

export default dropHandlerThunk;
