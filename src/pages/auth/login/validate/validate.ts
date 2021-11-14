import i18n from '../../../../core/i18n/i18n';

interface ValuesType<T = string> {
  password: T;
  email: T;
}

type ErrorType = Partial<ValuesType<string | boolean>>;

export const validate = (values: ValuesType<string>): ErrorType => {
  const errors: ErrorType = {};

  if (values.email === '') {
    errors.email = i18n.t('youDidNotEnterYourPassword') as string;
  }
  if (values.password === '') {
    errors.password = i18n.t('youDidNotEnterYourEmail') as string;
  }

  return errors;
};
