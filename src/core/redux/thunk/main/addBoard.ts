/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { v4 as uuidv4 } from 'uuid';
import { writeBoardData } from '../../action-creators/boards/boardAction';
import { toast, ToastOptions } from 'react-toastify';
import toastRyles from '../../../constants/toastRules';
import { writeUserBoardData } from '../../action-creators/users/userAction';
import { BoardState } from '../../types/boards/boardTypes';
import firebase from 'firebase/compat/app';

interface CardDate {
  getCurrentUserData: () => void;
  setBoardState: (
    value: React.SetStateAction<{
      boardTitle: string;
    }>
  ) => void;
  currentUser: firebase.User;
  boardTitle: string;
  createOrderNum: () => number;
  board: {
    [id: string]: BoardState;
  };
}

const addBoardThunk = (props: CardDate) => {
  return async (dispatch: any): Promise<void> => {
    try {
      const {
        getCurrentUserData,
        setBoardState,
        currentUser,
        board,
        boardTitle,
        createOrderNum
      } = props;
      const boardId = uuidv4();
      const order = createOrderNum();
      dispatch(writeBoardData(boardId, order, boardTitle, board));
      dispatch(writeUserBoardData(currentUser, boardId));
      setBoardState({ boardTitle: '' });
      getCurrentUserData();
    } catch (error) {
      const err = (error as Error).message;
      toast.warn(err, toastRyles as ToastOptions);
    }
  };
};

export default addBoardThunk;
