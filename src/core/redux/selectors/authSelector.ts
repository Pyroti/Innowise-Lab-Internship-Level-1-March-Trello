import { AuthState } from '../reducer/authReducer';
import { RootState } from '../reducer/rootReducer';

const authSelector = (state: RootState): AuthState => state.auth;

export default authSelector;
