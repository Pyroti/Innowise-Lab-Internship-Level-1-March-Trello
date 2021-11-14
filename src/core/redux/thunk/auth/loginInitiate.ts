import { toast, ToastOptions } from 'react-toastify';
import { Dispatch } from 'redux';
import AuthError from '../../../constants/authErrors';
import { auth } from '../../../firebase/firebase';
import {
  loginFail,
  loginStart,
  loginSuccess
} from '../../action-creators/auth/loginAction';
import { LoginAction } from '../../types/auth/loginTypes';
import i18n from '../../../../core/i18n/i18n';
import toastRyles from '../../../constants/toastRules';

export const loginInitiate = (email: string, password: string) => {
  return async (dispatch: Dispatch<LoginAction>): Promise<void> => {
    try {
      dispatch(loginStart());
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      dispatch(loginSuccess(user));
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (AuthError.userNotFound === errorMessage) {
        toast.warn(i18n.t('theUserDoesNotExist'), toastRyles as ToastOptions);
      }
      dispatch(loginFail(errorMessage));
    }
  };
};
