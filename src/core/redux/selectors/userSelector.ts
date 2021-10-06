import { UserState } from '../reducer/reducer';
import { RootState } from '../reducer/rootReducer';

const userSelector = (state: RootState): UserState => state.user;

export default userSelector;
