import firebase from 'firebase/compat/app';
import {
  GoogleSignInAction,
  GoogleSignInTypes
} from '../types/googleSignInTypes';
import { LoginAction, LoginActionTypes } from '../types/loginTypes';
import { LogoutAction, LogoutActionTypes } from '../types/logoutTypes';
import { RegisterAction, RegisterActionTypes } from '../types/registerTypes';
import { SetUserActionType, SetUserTypes } from '../types/setUserTypes';

export interface UserState {
  loading: boolean;
  currentUser: firebase.User | null;
  error: firebase.User | string | null;
}

const initialState: UserState = {
  loading: false,
  currentUser: null,
  error: null
};

type ActionTypes =
  | GoogleSignInAction
  | LoginAction
  | LogoutAction
  | RegisterAction
  | SetUserActionType;

const userReducer = (state = initialState, action: ActionTypes): UserState => {
  switch (action.type) {
    case RegisterActionTypes.REGISTER_START:
    case LoginActionTypes.LOGIN_START:
    case LogoutActionTypes.LOGOUT_START:
    case GoogleSignInTypes.GOOGLE_SIGN_IN_START:
      return {
        ...state,
        loading: true
      };
    case LogoutActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        currentUser: null
      };
    case SetUserTypes.SET_USER:
    case RegisterActionTypes.REGISTER_SUCCESS:
    case LoginActionTypes.LOGIN_SUCCESS:
    case GoogleSignInTypes.GOOGLE_SIGN_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload
      };
    case RegisterActionTypes.REGISTER_FAIL:
    case LoginActionTypes.LOGIN_FAIL:
    case LogoutActionTypes.LOGOUT_FAIL:
    case GoogleSignInTypes.GOOGLE_SIGN_IN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
