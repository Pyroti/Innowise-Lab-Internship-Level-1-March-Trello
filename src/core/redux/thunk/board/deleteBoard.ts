/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { deleteBoardData } from '../../action-creators/boards/boardAction';
import { toast, ToastOptions } from 'react-toastify';
import toastRyles from '../../../constants/toastRules';
import firebase from 'firebase/compat/app';
import {
  deleteBoardIdData,
  getUserData
} from '../../action-creators/users/userAction';
import { BoardState } from '../../types/boards/boardTypes';

interface BoardDate {
  updateBoardsOrder: () => void;
  deleteCardsInBoard: (boardId: string) => void;
  boardId: string;
  currentUser: firebase.User;
  board: {
    [id: string]: BoardState;
  };
}

const deleteBoardThunk = (props: BoardDate) => {
  return async (dispatch: any): Promise<void> => {
    try {
      const {
        deleteCardsInBoard,
        board,
        currentUser,
        boardId,
        updateBoardsOrder
      } = props;
      deleteCardsInBoard(boardId);
      dispatch(deleteBoardData(boardId, board));
      dispatch(deleteBoardIdData(currentUser.uid, boardId));
      updateBoardsOrder();
      dispatch(getUserData(currentUser));
    } catch (error) {
      const err = (error as Error).message;
      toast.warn(err, toastRyles as ToastOptions);
    }
  };
};

export default deleteBoardThunk;
