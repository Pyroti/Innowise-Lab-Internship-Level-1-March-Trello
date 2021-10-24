/* eslint-disable no-console */
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

const writeBoardData = (
  boardId: string,
  order: number,
  title: string,
  boards: { [id: string]: BoardState }
) => {
  return async (dispatch: Dispatch<BoardAction>): Promise<void> => {
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
    set(ref(db, `boards/${boardId}`), {
      boardId: boardId,
      order: order,
      title: title
    })
      .then(() => dispatch(boardSuccess({ ...boards, [boardId]: board })))
      .catch((error: Error) => dispatch(boardFail(error.message)));
  };
};

const getBoardsData = (boardsId: string[]) => {
  return async (dispatch: Dispatch<BoardAction>): Promise<void> => {
    dispatch(boardStart());
    const db = getDatabase();
    const boardsData = await Promise.all(
      boardsId.map((boardId) => get(ref(db, `/boards/${boardId}`)))
    );
    const allBoards = boardsData.map((snapshot) => snapshot.val());
    const finalBoards = allBoards.reduce((acc, board) => {
      if (board?.boardId) {
        acc[board.boardId] = board;
      }
      return acc;
    }, {} as BoardState);
    dispatch(boardSuccess(finalBoards));
  };
};

const deleteCardIdData = (cardId: string, boardId: string) => {
  return (): void => {
    const db = getDatabase();
    remove(ref(db, `boards/${boardId}/cards/${cardId}`));
  };
};

const deleteBoardData = (
  boardId: string,
  boards: { [id: string]: BoardState }
) => {
  return async (dispatch: Dispatch<BoardAction>): Promise<void> => {
    const db = getDatabase();
    remove(ref(db, `boards/${boardId}`));
    console.log(boards);
    console.log(boards[`${boardId}`]);
    delete boards[`${boardId}`];
    console.log(boards);
    dispatch(boardSuccess(boards));
  };
};

const editBoardData = (boardId: string, boardTitle: string) => {
  return (): void => {
    const db = getDatabase();
    update(ref(db, `boards/${boardId}`), { title: boardTitle });
  };
};

const updateBoardOrderData = (boardId: string, orderNum: number) => {
  return (): void => {
    const db = getDatabase();
    update(ref(db, `boards/${boardId}`), { order: orderNum });
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
