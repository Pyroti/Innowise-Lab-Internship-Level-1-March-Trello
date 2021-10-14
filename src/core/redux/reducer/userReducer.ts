import {
  UserAction,
  UserActionTypes,
  UserState
} from '../types/users/userTypes';

export interface InitUserState {
  user: UserState;
  isLoading: boolean;
  error: string;
}

const initialState: InitUserState = {
  user: {
    userId: '',
    username: '',
    email: '',
    boards: {
      '': { boardId: '' }
    }
  },
  error: null,
  isLoading: false
};

const userReducer = (
  state = initialState,
  action: UserAction
): InitUserState => {
  switch (action.type) {
    case UserActionTypes.USER_START:
      return {
        ...state,
        isLoading: true
      };
    case UserActionTypes.USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload
      };
    case UserActionTypes.USER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
