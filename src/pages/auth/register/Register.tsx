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
import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import usersSelector from '../../../core/redux/selectors/usersSelectors';
import toastRyles from '../../../core/constants/toastRules';
import { useFormik } from 'formik';
import { registerInitiate } from '../../../core/redux/thunk/auth/registerInitiate';
import { getUsersData } from '../../../core/redux/thunk/users/getUsersData';
import { writeUserData } from '../../../core/redux/thunk/users/writeUserData';
import { validate } from './validate/validate';

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const history = useHistory();
  const { currentUser } = useTypedSelector(authSelector);
  // const { users } = useTypedSelector(usersSelector);

  const formik = useFormik({
    initialValues: {
      displayName: '',
      email: '',
      password: '',
      passwordConfirm: ''
    },
    validate,
    onSubmit: (values) => {
      if (formik.errors.displayName) {
        toast.warn(t('displayNameEmpty'), toastRyles as ToastOptions);
      }
      if (!formik.errors.email) {
        toast.warn(t('invalidLogin'), toastRyles as ToastOptions);
      }
      if (!formik.errors.password) {
        toast.warn(t('passwordRules'), toastRyles as ToastOptions);
      }
      if (formik.errors.passwordConfirm) {
        toast.warn(t('passwordRules'), toastRyles as ToastOptions);
      }
      if (
        formik.errors.displayName &&
        formik.errors.email &&
        formik.errors.password &&
        formik.errors.passwordConfirm
      ) {
        dispatch(
          registerInitiate(values.email, values.password, values.displayName)
        );
      }
    }
  });

  useEffect(() => {
    if (currentUser) {
      history.push(MainRoutes.main);
    }
  }, [currentUser, history]);

  useEffect(() => {
    dispatch(getUsersData());
  }, [dispatch]);

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

  // const checkUserExist = () => {
  //   const usersMail = Object.values(users).map((user) => user.email);
  //   if (usersMail.indexOf(formik.values.email) != -1) {
  //     toast.warn(t('theUserExists'), toastRyles as ToastOptions);
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };

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
      <ToastContainer />
    </AuthContent>
  );
};

export default Register;
