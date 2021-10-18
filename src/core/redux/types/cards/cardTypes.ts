export enum CardActionTypes {
  CARD_START = 'CARD_START',
  CARD_SUCCSES = 'CARD_SUCCSES',
  CARD_FAIL = 'CARD_FAIL'
}

export interface CardState {
  cardId: string;
  order: number;
  title: string;
  textContent?: string;
}

interface CardStartAction {
  type: CardActionTypes.CARD_START;
}

interface CardSuccessAction {
  type: CardActionTypes.CARD_SUCCSES;
  payload: {
    [id: string]: CardState;
  };
}

interface CardFailAction {
  type: CardActionTypes.CARD_FAIL;
  payload: string;
}

export type CardAction = CardStartAction | CardSuccessAction | CardFailAction;
