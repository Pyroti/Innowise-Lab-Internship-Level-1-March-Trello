import { get, getDatabase, ref, set } from 'firebase/database';
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
  title: string,
  boards: { [x: string]: BoardState }
) => {
  return async (dispatch: Dispatch<BoardAction>): Promise<void> => {
    const board = { boardId, title };
    dispatch(boardStart());
    const db = getDatabase();
    set(ref(db, `boards/${boardId}`), {
      boardId: boardId,
      title: title
    })
      .then(() => dispatch(boardSuccess({ ...boards, [boardId]: board })))
      .catch((error: Error) => dispatch(boardFail(error.message)));
  };
};

const getBoardsData = (
  boardsId: string[]
) => {
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
    
    // boardsData.forEach((snapshot, index) => {
    //   if (snapshot.exists()) {
    //     const boardData = snapshot.val();
    //     // const br = Object.values({ ...boards, [boardsId[index]]: data })[0];
    //     dispatch(boardSuccess(br));
    //   }
    // });
  };
};

export { writeBoardData, getBoardsData };
