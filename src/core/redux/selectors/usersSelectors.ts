import { RootState } from '../reducer/rootReducer';
import { InitUsersState } from '../reducer/usersReducer';

const usersSelector = (state: RootState): InitUsersState => state.users;

export default usersSelector;
