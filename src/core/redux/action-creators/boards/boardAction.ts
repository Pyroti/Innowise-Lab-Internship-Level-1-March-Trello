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
  boardsId: string[],
  boards: { [x: string]: BoardState }
) => {
  return async (dispatch: Dispatch<BoardAction>): Promise<void> => {
    dispatch(boardStart());
    const db = getDatabase();
    console.log(boardsId);
    const boardsData = await Promise.all(
      boardsId.map((boardId) => get(ref(db, `/boards/${boardId}`)))
    );
    boardsData.forEach((snapshot, index) => {
      // console.log(boardId);
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log('getBoardsData');
        console.log(data);
        const br = Object.values({ ...boards, [boardsId[index]]: data })[0];
        dispatch(boardSuccess(br));
      }
    });
    // .catch((error) => {
    //   const err = (error as Error).message;
    //   dispatch(boardFail(err));
    // })
  };
};

export { writeBoardData, getBoardsData };
