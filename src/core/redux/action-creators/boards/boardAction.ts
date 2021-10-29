import { get, getDatabase, ref, remove, set, update } from 'firebase/database';
import { Dispatch } from 'redux';
import {
  BoardAction,
  BoardActionTypes,
  BoardState
} from '../../types/boards/boardTypes';

const boardStart = (): BoardAction => ({
  type: BoardActionTypes.BOARD_START
});

const boardSuccess = (board: { [id: string]: BoardState }): BoardAction => ({
  type: BoardActionTypes.BOARD_SUCCESS,
  payload: board
});

const boardFail = (error: string): BoardAction => ({
  type: BoardActionTypes.BOARD_FAIL,
  payload: error
});

const boardIdRef = (boardId: string) => `boards/${boardId}`;
const boardCardIdRef = (boardId: string, cardId: string) =>
  `boards/${boardId}/cards/${cardId}`;

const writeBoardData = (
  boardId: string,
  order: number,
  title: string,
  boards: { [id: string]: BoardState }
) => {
  return async (dispatch: Dispatch<BoardAction>): Promise<void> => {
    try {
      const board = {
        boardId,
        order,
        title,
        cards: {
          key: { cardId: '' }
        }
      };
      dispatch(boardStart());
      const db = getDatabase();
      set(ref(db, boardIdRef(boardId)), {
        boardId: boardId,
        order: order,
        title: title
      });
      dispatch(boardSuccess({ ...boards, [boardId]: board }));
    } catch (error) {
      const err = (error as Error).message;
      dispatch(boardFail(err));
    }
  };
};

const getBoardsData = (boardsId: string[]) => {
  return async (dispatch: Dispatch<BoardAction>): Promise<void> => {
    try {
      dispatch(boardStart());
      const db = getDatabase();
      const boardsData = await Promise.all(
        boardsId.map((boardId) => get(ref(db, boardIdRef(boardId))))
      );
      const allBoards = boardsData.map((snapshot) => snapshot.val());
      const finalBoards = allBoards.reduce((acc, board) => {
        if (board?.boardId) {
          acc[board.boardId] = board;
        }
        return acc;
      }, {} as BoardState);
      dispatch(boardSuccess(finalBoards));
    } catch (error) {
      const err = (error as Error).message;
      dispatch(boardFail(err));
    }
  };
};

const deleteCardIdData = (cardId: string, boardId: string) => {
  return async (dispatch: Dispatch<BoardAction>): Promise<void> => {
    try {
      const db = getDatabase();
      remove(ref(db, boardCardIdRef(boardId, cardId)));
    } catch (error) {
      const err = (error as Error).message;
      dispatch(boardFail(err));
    }
  };
};

const deleteBoardData = (
  boardId: string,
  boards: { [id: string]: BoardState }
) => {
  return async (dispatch: Dispatch<BoardAction>): Promise<void> => {
    try {
      dispatch(boardStart());
      const db = getDatabase();
      remove(ref(db, boardIdRef(boardId)));
      delete boards[`${boardId}`];
      dispatch(boardSuccess(boards));
    } catch (error) {
      const err = (error as Error).message;
      dispatch(boardFail(err));
    }
  };
};

const editBoardData = (boardId: string, boardTitle: string) => {
  return async (dispatch: Dispatch<BoardAction>): Promise<void> => {
    try {
      const db = getDatabase();
      update(ref(db, boardIdRef(boardId)), { title: boardTitle });
    } catch (error) {
      const err = (error as Error).message;
      dispatch(boardFail(err));
    }
  };
};

const updateBoardOrderData = (boardId: string, orderNum: number) => {
  return async (dispatch: Dispatch<BoardAction>): Promise<void> => {
    try {
      const db = getDatabase();
      update(ref(db, boardIdRef(boardId)), { order: orderNum });
    } catch (error) {
      const err = (error as Error).message;
      dispatch(boardFail(err));
    }
  };
};

export {
  writeBoardData,
  getBoardsData,
  deleteCardIdData,
  deleteBoardData,
  editBoardData,
  updateBoardOrderData
};
