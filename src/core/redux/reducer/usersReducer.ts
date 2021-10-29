import {
  UsersAction,
  UsersActionTypes,
  UsersState
} from '../types/users/usersTypes';

export interface InitUsersState {
  users: {
    [id: string]: UsersState;
  };
  isLoading: boolean;
  error: string;
}

const initialState: InitUsersState = {
  users: null,
  error: null,
  isLoading: false
};

const userReducer = (
  state = initialState,
  action: UsersAction
): InitUsersState => {
  switch (action.type) {
    case UsersActionTypes.USERS_START:
      return {
        ...state,
        isLoading: true
      };
    case UsersActionTypes.USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.payload
      };
    case UsersActionTypes.USERS_FAIL:
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
