import {
  CardAction,
  CardActionTypes,
  CardState
} from '../types/cards/cardTypes';

export interface InitBoardState {
  card: CardState;
  isLoading: boolean;
  error: string;
}

const initialState: InitBoardState = {
  card: null,
  isLoading: false,
  error: null
};

const userReducer = (
  state = initialState,
  action: CardAction
): InitBoardState => {
  switch (action.type) {
    case CardActionTypes.CARD_START:
      return {
        ...state,
        isLoading: true,
        card: action.payload
      };
    case CardActionTypes.CARD_SUCCSES:
      return {
        ...state,
        isLoading: false,
        card: action.payload
      };
    case CardActionTypes.CARD_FAIL:
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
