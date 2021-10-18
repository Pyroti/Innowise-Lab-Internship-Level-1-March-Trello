import { InitBoardState } from '../reducer/boardReducer';
import { RootState } from '../reducer/rootReducer';

const boardSelector = (state: RootState): InitBoardState => state.board;

export default boardSelector;
