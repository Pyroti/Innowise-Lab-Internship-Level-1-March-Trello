import { toast, ToastOptions } from 'react-toastify';
import toastRyles from '../../../constants/toastRules';
import { BoardState } from '../../types/boards/boardTypes';
import { RootState } from '../../reducer/rootReducer';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { updateBoardOrderData } from './updateBoardOrderData';

interface ChangeCardOrder {
  filterBoards: () => BoardState[];
  currentBoard: BoardState;
  boardData: BoardState;
}

const changeBoardOrderThunk = ({
  filterBoards,
  currentBoard,
  boardData
}: ChangeCardOrder) => {
  return async (
    dispatch: ThunkDispatch<RootState, void, Action>
  ): Promise<void> => {
    try {
      filterBoards().map((board) => {
        const isCurrentBoard = board.boardId === currentBoard.boardId;

        const isFirstBoard =
          board.order <= boardData.order &&
          board.order > currentBoard.order &&
          currentBoard.order < boardData.order;

        const isLastBoard =
          board.order >= boardData.order &&
          board.order < currentBoard.order &&
          currentBoard.order > boardData.order;

        if (isCurrentBoard) {
          dispatch(updateBoardOrderData(board.boardId, boardData.order));
        } else if (isFirstBoard) {
          dispatch(updateBoardOrderData(board.boardId, board.order - 1));
        } else if (isLastBoard) {
          dispatch(updateBoardOrderData(board.boardId, board.order + 1));
        }
      });
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.warn(errorMessage, toastRyles as ToastOptions);
    }
  };
};

export default changeBoardOrderThunk;
