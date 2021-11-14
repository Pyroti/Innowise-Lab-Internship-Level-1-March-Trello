import { TextField } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import AuthContent from '../../../core/components/authContent/AuthContent';
import AuthForm from '../../../core/components/authForm/AuthForm';
import MainRoutes from '../../../core/constants/MainRouters';
import { useTypedSelector } from '../../../core/hooks/useTypeSelector';
import authSelector from '../../../core/redux/selectors/authSelector';
import AuthButtons from '../../../core/components/buttons/AuthButtons';
import SingInButton from '../../../core/components/buttons/SingInButton';
import SingUpButton from '../../../core/components/buttons/SingUpButton';
import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import { registerInitiate } from '../../../core/redux/thunk/auth/registerInitiate';
import { writeUserData } from '../../../core/redux/thunk/users/writeUserData';
import { validate } from './validate/validate';
import toastRyles from '../../../core/constants/toastRules';

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const history = useHistory();
  const { currentUser } = useTypedSelector(authSelector);

  const formik = useFormik({
    initialValues: {
      displayName: '',
      email: '',
      password: '',
      passwordConfirm: ''
    },
    onSubmit: (values) => {
      const errors = validate(values);
      const errorsValues = Object.values(errors);
      const hasErrors = errorsValues.length > 0;
      if (!hasErrors) {
        dispatch(
          registerInitiate(values.email, values.password, values.displayName)
        );
      } else {
        errorsValues.forEach((errorMessage) => {
          toast.warn(errorMessage, toastRyles as ToastOptions);
        });
      }
    }
  });

  useEffect(() => {
    if (currentUser) {
      history.push(MainRoutes.main);
    }
  }, [currentUser, history]);

  useEffect(() => {
    if (currentUser) {
      dispatch(
        writeUserData(
          currentUser?.uid,
          formik.values.displayName,
          formik.values.email
        )
      );
    }
  }, [currentUser, dispatch, formik.values.displayName, formik.values.email]);

  return (
    <AuthContent>
      <AuthForm onSubmit={formik.handleSubmit}>
        <h1>{t('registration')}</h1>
        <TextField
          id="displayName"
          label={t('enterYourName')}
          type="text"
          name="displayName"
          value={formik.values.displayName}
          onChange={formik.handleChange}
        />
        <TextField
          id="email"
          label={t('enterYourMail')}
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <TextField
          id="password"
          label={t('enterYourPassword')}
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <TextField
          id="passwordConfirm"
          label={t('reEnterYourPassword')}
          type="password"
          name="passwordConfirm"
          value={formik.values.passwordConfirm}
          onChange={formik.handleChange}
        />
        <AuthButtons>
          <SingInButton type="submit">{t('createAccount')}</SingInButton>
          <Link to={MainRoutes.login}>
            <SingUpButton type="button">{t('goBack')}</SingUpButton>
          </Link>
        </AuthButtons>
      </AuthForm>
    </AuthContent>
  );
};

export default Register;
