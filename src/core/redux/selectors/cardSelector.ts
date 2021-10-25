import { InitCardState } from '../reducer/cardReducer';
import { RootState } from '../reducer/rootReducer';

const cardSelector = (state: RootState): InitCardState => state.card;

export default cardSelector;
