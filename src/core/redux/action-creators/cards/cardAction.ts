import firebase from 'firebase/compat/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { Dispatch } from 'redux';
import {
  CardAction,
  CardActionTypes,
  CardState
} from '../../types/cards/cardTypes';

const cardSet = (user: CardState): CardAction => ({
  type: CardActionTypes.CARD_SUCCSES,
  payload: user
});

const cardFail = (error: string): CardAction => ({
  type: CardActionTypes.CARD_FAIL,
  payload: error
});

const writeUserData = (
  cardId: string | undefined,
  title: string,
  textContent: string
) => {
  return async (dispatch: Dispatch<CardAction>): Promise<void> => {
    const card = { cardId, title, textContent };
    const db = getDatabase();
    set(ref(db, 'card/' + cardId), {
      cardId: cardId,
      title: title,
      textContent: textContent
    })
      .then(() => dispatch(cardSet(card)))
      .catch((error: Error) => dispatch(cardFail(error.message)));
  };
};

/*TODO: to correct*/
const getUserData = (currentUser: firebase.User | null) => {
  return async (dispatch: Dispatch<CardAction>): Promise<void> => {
    try {
      const db = getDatabase();
      const cardRef = ref(db, 'card/' + currentUser?.uid);
      let data: CardState = {
        cardId: undefined,
        title: '',
        textContent: ''
      };
      onValue(cardRef, (snapshot) => {
        data = snapshot.val();
      });
      dispatch(cardSet(data));
    } catch (error) {
      const err = (error as Error).message;
      dispatch(cardFail(err));
    }
  };
};

export { writeUserData, getUserData };
