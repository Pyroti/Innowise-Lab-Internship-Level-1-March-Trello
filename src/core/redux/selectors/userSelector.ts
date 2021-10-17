import { RootState } from '../reducer/rootReducer';
import { InitUserState } from '../reducer/userReducer';

const userSelector = (state: RootState): InitUserState => state.user;

export default userSelector;
