import { RootState } from '../reducer/rootReducer';
import { UserState } from '../reducer/userReducer';

const userSelector = (state: RootState): UserState => state.user;

export default userSelector;
