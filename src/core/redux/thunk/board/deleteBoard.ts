import { deleteBoardData } from '../../action-creators/boards/boardAction';
import { toast, ToastOptions } from 'react-toastify';
import toastRyles from '../../../constants/toastRules';
import {
  deleteBoardIdData,
  getUserData
} from '../../action-creators/users/userAction';
import { RootState } from '../../reducer/rootReducer';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import authSelector from '../../selectors/authSelector';
import boardSelector from '../../selectors/boardSelector';

interface BoardDate {
  updateBoardsOrder: () => void;
  deleteCardsInBoard: (boardId: string) => void;
  boardId: string;
}

const deleteBoardThunk = ({
  deleteCardsInBoard,
  boardId,
  updateBoardsOrder
}: BoardDate) => {
  return async (
    dispatch: ThunkDispatch<RootState, void, Action>,
    getState: () => RootState
  ): Promise<void> => {
    try {
      const state = getState();
      const { board } = boardSelector(state);
      const { currentUser } = authSelector(state);
      deleteCardsInBoard(boardId);
      dispatch(deleteBoardData(boardId, board));
      dispatch(deleteBoardIdData(currentUser.uid, boardId));
      updateBoardsOrder();
      dispatch(getUserData(currentUser));
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.warn(errorMessage, toastRyles as ToastOptions);
    }
  };
};

export default deleteBoardThunk;
