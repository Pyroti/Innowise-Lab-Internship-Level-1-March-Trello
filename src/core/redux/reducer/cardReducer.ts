import {
  CardAction,
  CardActionTypes,
  CardState
} from '../types/cards/cardTypes';

export interface InitCardState {
  card: {
    [id: string]: CardState;
  };
  isLoading: boolean;
  error: string;
}

const initialState: InitCardState = {
  card: null,
  isLoading: false,
  error: null
};

const userReducer = (
  state = initialState,
  action: CardAction
): InitCardState => {
  switch (action.type) {
    case CardActionTypes.CARD_START:
      return {
        ...state,
        isLoading: true
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
