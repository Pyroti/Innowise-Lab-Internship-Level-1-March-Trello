import { toast, ToastOptions } from 'react-toastify';
import { Dispatch } from 'redux';
import { auth } from '../../../firebase/firebase';
import {
  registerFail,
  registerStart,
  registerSuccess
} from '../../action-creators/auth/registerAction';
import { RegisterAction } from '../../types/auth/registerTypes';
import i18n from '../../../../core/i18n/i18n';
import toastRyles from '../../../constants/toastRules';
import AuthError from '../../../constants/authErrors';

export const registerInitiate = (
  email: string,
  password: string,
  displayName: string
) => {
  return async (dispatch: Dispatch<RegisterAction>): Promise<void> => {
    try {
      dispatch(registerStart());
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await user?.updateProfile({
        displayName
      });
      dispatch(registerSuccess(user));
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (AuthError.emailAlreadyInUse === errorMessage) {
        toast.warn(i18n.t('theUserExists'), toastRyles as ToastOptions);
      }
      dispatch(registerFail(errorMessage));
    }
  };
};
