import regexp from '../../../../core/constants/regexp';

interface ValuesType {
  password: string;
  email: string;
  displayName: string;
  passwordConfirm: string;
}

interface ErrorType {
  password: boolean;
  email: boolean;
  displayName: boolean;
  passwordConfirm: boolean;
}

export const validate = (values: ValuesType): ErrorType => {
  const errors = {
    displayName: true,
    email: true,
    password: true,
    passwordConfirm: true
  };
  if (values.displayName === '') {
    errors.displayName = false;
  }
  if (!regexp.regMailRules.test(values.email)) {
    errors.email = false;
  }
  if (!regexp.regPasswordRules.test(values.password)) {
    errors.password = false;
  }
  if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = false;
  }

  return errors;
};
