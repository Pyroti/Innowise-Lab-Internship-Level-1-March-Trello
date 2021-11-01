import {
  editBoardData,
  getBoardsData
} from '../../action-creators/boards/boardAction';
import { toast, ToastOptions } from 'react-toastify';
import toastRyles from '../../../constants/toastRules';
import { BoardState } from '../../types/boards/boardTypes';
import { RootState } from '../../reducer/rootReducer';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import userSelector from '../../selectors/userSelector';

interface BoardDate {
  boardData: BoardState;
  boardTitle: string;
}

const editBoardThunk = ({ boardData, boardTitle }: BoardDate) => {
  return async (
    dispatch: ThunkDispatch<RootState, void, Action>,
    getState: () => RootState
  ): Promise<void> => {
    try {
      const state = getState();
      const { user } = userSelector(state);
      dispatch(editBoardData(boardData.boardId, boardTitle));
      dispatch(getBoardsData(Object.keys(user.boards)));
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.warn(errorMessage, toastRyles as ToastOptions);
    }
  };
};

export default editBoardThunk;
