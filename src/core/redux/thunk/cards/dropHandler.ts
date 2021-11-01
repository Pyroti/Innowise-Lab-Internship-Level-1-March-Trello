import { CardState } from '../../types/cards/cardTypes';
import { getBoardsData } from '../../action-creators/boards/boardAction';
import { toast, ToastOptions } from 'react-toastify';
import toastRyles from '../../../constants/toastRules';
import { RootState } from '../../reducer/rootReducer';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import userSelector from '../../selectors/userSelector';

interface CardDate {
  currentItemNameId: string;
  cardNameId: string;
  currentBordIdcard: string;
  boardId: string;
  cardData: CardState;
  changeCardOrderInBoardDnD: (cardData: CardState) => void;
  changeCardOrderBetweenBoardsDnD: (cardData: CardState) => void;
}

const dropHandlerThunk = ({
  currentItemNameId,
  cardNameId,
  currentBordIdcard,
  changeCardOrderInBoardDnD,
  cardData,
  boardId,
  changeCardOrderBetweenBoardsDnD
}: CardDate) => {
  return async (
    dispatch: ThunkDispatch<RootState, void, Action>,
    getState: () => RootState
  ): Promise<void> => {
    try {
      const state = getState();
      const { user } = userSelector(state);
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
      const errorMessage = (error as Error).message;
      toast.warn(errorMessage, toastRyles as ToastOptions);
    }
  };
};

export default dropHandlerThunk;
