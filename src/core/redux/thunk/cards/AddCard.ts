/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CardState } from '../../types/cards/cardTypes';
import { v4 as uuidv4 } from 'uuid';
import { getBoardsData } from '../../action-creators/boards/boardAction';
import {
  writeBoardCardData,
  writeCardData
} from '../../action-creators/cards/cardAction';
import { UserState } from '../../types/users/userTypes';
import { toast, ToastOptions } from 'react-toastify';
import toastRyles from '../../../constants/toastRules';

interface CardDate {
  createOrderNumCard: (currentBoardId: string) => number;
  setCardState: (value: React.SetStateAction<{ cardTitle: string }>) => void;
  boardId: string;
  user: UserState;
  card: { [id: string]: CardState };
  cardTitle: string;
}

const addCardThunk = (props: CardDate) => {
  return async (dispatch: any): Promise<void> => {
    try {
      const {
        createOrderNumCard,
        setCardState,
        boardId,
        user,
        card,
        cardTitle
      } = props;
      const cardId = uuidv4();
      const order = createOrderNumCard(boardId);
      dispatch(writeCardData(cardId, order, cardTitle, 'none', card));
      dispatch(writeBoardCardData(boardId, cardId));
      setCardState({ cardTitle: '' });
      dispatch(getBoardsData(Object.keys(user.boards)));
    } catch (error) {
      const err = (error as Error).message;
      toast.warn(err, toastRyles as ToastOptions);
    }
  };
};

export default addCardThunk;
