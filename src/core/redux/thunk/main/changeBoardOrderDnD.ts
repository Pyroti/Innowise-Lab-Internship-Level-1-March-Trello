/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { toast, ToastOptions } from 'react-toastify';
import toastRyles from '../../../constants/toastRules';
import { updateBoardOrderData } from '../../action-creators/boards/boardAction';
import { BoardState } from '../../types/boards/boardTypes';

interface changeCardOrder {
  filterBoards: () => BoardState[];
  currentBoard: BoardState;
  boardData: BoardState;
}

const changeBoardOrderDnDThunk = (props: changeCardOrder) => {
  return async (dispatch: any): Promise<void> => {
    try {
      const { filterBoards, currentBoard, boardData } = props;
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
      const err = (error as Error).message;
      toast.warn(err, toastRyles as ToastOptions);
    }
  };
};

export default changeBoardOrderDnDThunk;
