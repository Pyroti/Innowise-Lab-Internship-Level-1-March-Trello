import { Dispatch } from 'redux';
import { auth } from '../../../firebase/firebase';
import {
  logoutFail,
  logoutStart,
  logoutSuccess
} from '../../action-creators/auth/logoutAction';
import { LogoutAction } from '../../types/auth/logoutTypes';

export const logoutInitiate = () => {
  return async (dispatch: Dispatch<LogoutAction>): Promise<void> => {
    try {
      dispatch(logoutStart());
      await auth.signOut();
      dispatch(logoutSuccess());
    } catch (error) {
      const errorMessage = (error as Error).message;
      dispatch(logoutFail(errorMessage));
    }
  };
};
