import { v4 as uuidv4 } from 'uuid';
import { writeBoardData } from '../../action-creators/boards/boardAction';
import { toast, ToastOptions } from 'react-toastify';
import toastRyles from '../../../constants/toastRules';
import { writeUserBoardData } from '../../action-creators/users/userAction';
import { RootState } from '../../reducer/rootReducer';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import boardSelector from '../../selectors/boardSelector';
import authSelector from '../../selectors/authSelector';

interface CardDate {
  getCurrentUserData: () => void;
  setBoardState: (
    value: React.SetStateAction<{
      boardTitle: string;
    }>
  ) => void;
  boardTitle: string;
  createOrderNum: () => number;
}

const addBoardThunk = ({
  getCurrentUserData,
  setBoardState,
  boardTitle,
  createOrderNum
}: CardDate) => {
  return async (
    dispatch: ThunkDispatch<RootState, void, Action>,
    getState: () => RootState
  ): Promise<void> => {
    try {
      const state = getState();
      const { currentUser } = authSelector(state);
      const { board } = boardSelector(state);
      const boardId = uuidv4();
      const order = createOrderNum();
      dispatch(writeBoardData(boardId, order, boardTitle, board));
      dispatch(writeUserBoardData(currentUser, boardId));
      setBoardState({ boardTitle: '' });
      getCurrentUserData();
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.warn(errorMessage, toastRyles as ToastOptions);
    }
  };
};

export default addBoardThunk;
