import {
  CardAction,
  CardActionTypes,
  CardState
} from '../../types/cards/cardTypes';

export const cardStart = (): CardAction => ({
  type: CardActionTypes.CARD_START
});

export const cardSuccess = (card: { [id: string]: CardState }): CardAction => ({
  type: CardActionTypes.CARD_SUCCESS,
  payload: card
});

export const cardFail = (error: string): CardAction => ({
  type: CardActionTypes.CARD_FAIL,
  payload: error
});
