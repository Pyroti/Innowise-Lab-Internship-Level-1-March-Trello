import {
  BoardAction,
  BoardActionTypes,
  BoardState
} from '../types/boards/boardTypes';

export interface InitBoardState {
  board: {
    [id: string]: BoardState;
  };
  isLoading: boolean;
  error: string;
}

const initialState: InitBoardState = {
  board: null,
  isLoading: false,
  error: null
};

const userReducer = (
  state = initialState,
  action: BoardAction
): InitBoardState => {
  switch (action.type) {
    case BoardActionTypes.BOARD_START:
      return {
        ...state,
        isLoading: true
      };
    case BoardActionTypes.BOARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        board: action.payload
      };
    case BoardActionTypes.BOARD_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
