import { BoardState } from '../redux/types/boards/boardTypes';
import { CardState } from '../redux/types/cards/cardTypes';

type aType = BoardState | CardState;
type bType = BoardState | CardState;

const sortData = (a: aType, b: bType): number => {
  if (a.order > b.order) {
    return 1;
  } else {
    return -1;
  }
};
export default sortData;
