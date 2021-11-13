import { v4 as uuidv4 } from 'uuid';
import { toast, ToastOptions } from 'react-toastify';
import toastRyles from '../../../constants/toastRules';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../reducer/rootReducer';
import { Action } from 'redux';
import userSelector from '../../selectors/userSelector';
import cardSelector from '../../selectors/cardSelector';
import { writeCardData } from './writeCardData';
import { writeBoardCardData } from './writeBoardCardData';
import { getBoardsData } from '../boards/getBoardsData';

interface CardDate {
  createOrderNumCard: (currentBoardId: string) => number;
  setCardState: (value: React.SetStateAction<{ cardTitle: string }>) => void;
  boardId: string;
  cardTitle: string;
}

const addCardThunk = ({
  createOrderNumCard,
  setCardState,
  boardId,
  cardTitle
}: CardDate) => {
  return async (
    dispatch: ThunkDispatch<RootState, void, Action>,
    getState: () => RootState
  ): Promise<void> => {
    try {
      const state = getState();
      const { user } = userSelector(state);
      const { card } = cardSelector(state);
      const cardId = uuidv4();
      const order = createOrderNumCard(boardId);
      dispatch(writeCardData(cardId, order, cardTitle, 'none', card));
      dispatch(writeBoardCardData(boardId, cardId));
      setCardState({ cardTitle: '' });
      dispatch(getBoardsData(Object.keys(user.boards)));
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.warn(errorMessage, toastRyles as ToastOptions);
    }
  };
};

export default addCardThunk;
