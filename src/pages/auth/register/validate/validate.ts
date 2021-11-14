import regexp from '../../../../core/constants/regexp';
import i18n from '../../../../core/i18n/i18n';

interface ValuesType<T = string> {
  password: T;
  email: T;
  displayName: T;
  passwordConfirm: T;
}

type ErrorType = Partial<ValuesType<string | boolean>>;

export const validate = (values: ValuesType<string>): ErrorType => {
  const errors: ErrorType = {};

  if (values.displayName === '') {
    errors.displayName = i18n.t('displayNameEmpty') as string;
  }
  if (!regexp.regMailRules.test(values.email)) {
    errors.email = i18n.t('invalidLogin') as string;
  }
  if (!regexp.regPasswordRules.test(values.password)) {
    errors.password = i18n.t('passwordRules') as string;
  }
  if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = i18n.t('passwordsDoNotMatch') as string;
  }

  return errors;
};
