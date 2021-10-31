/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  editBoardData,
  getBoardsData
} from '../../action-creators/boards/boardAction';
import { toast, ToastOptions } from 'react-toastify';
import toastRyles from '../../../constants/toastRules';
import { BoardState } from '../../types/boards/boardTypes';
import { UserState } from '../../types/users/userTypes';

interface BoardDate {
  boardData: BoardState;
  boardTitle: string;
  user: UserState;
}

const editBoardThunk = (props: BoardDate) => {
  return async (dispatch: any): Promise<void> => {
    try {
      const { boardData, boardTitle, user } = props;
      dispatch(editBoardData(boardData.boardId, boardTitle));
      dispatch(getBoardsData(Object.keys(user.boards)));
    } catch (error) {
      const err = (error as Error).message;
      toast.warn(err, toastRyles as ToastOptions);
    }
  };
};

export default editBoardThunk;
