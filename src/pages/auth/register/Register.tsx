import { TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import AuthContent from '../../../core/components/authContent/AuthContent';
import AuthForm from '../../../core/components/authForm/AuthForm';
import MainRoutes from '../../../core/constants/MainRouters';
import { useTypedSelector } from '../../../core/hooks/useTypeSelector';
import { registerInitiate } from '../../../core/redux/action-creators/auth/registerAction';
import { writeUserData } from '../../../core/redux/action-creators/users/userAction';
import authSelector from '../../../core/redux/selectors/authSelector';
import AuthButtons from './styled/AuthButtons';
import SingInButton from './styled/SingInButton';
import SingUpButton from './styled/SingUpButton';
import { getUsersData } from '../../../core/redux/action-creators/users/usersAction';
import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import usersSelector from '../../../core/redux/selectors/usersSelectors';
import regepx from '../../../core/constants/regepx';
import toastRyles from '../../../core/constants/toastRules';

const Register: React.FC = () => {
  const [registerState, setRegisterState] = useState({
    displayName: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });
  const { email, password, displayName, passwordConfirm } = registerState;

  const { currentUser } = useTypedSelector(authSelector);
  const { users } = useTypedSelector(usersSelector);

  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
      dispatch(writeUserData(currentUser?.uid, displayName, email));
      setRegisterState({
        email: '',
        password: '',
        displayName: '',
        passwordConfirm: ''
      });
    }
  }, [currentUser, dispatch, displayName, email]);

  const handleChange = (event: React.ChangeEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    setRegisterState((prevState) => ({ ...prevState, [name]: value }));
  };

  const checkPassword = () => {
    if (!regepx.regPasswordRules.test(password)) {
      toast.warn(t('passwordRules'), toastRyles as ToastOptions);
      return false;
    } else {
      return true;
    }
  };

  const checkMail = () => {
    if (!regepx.regMailRules.test(email)) {
      toast.warn(t('invalidLogin'), toastRyles as ToastOptions);
      return false;
    } else {
      return true;
    }
  };

  const checkDisplayName = () => {
    if (displayName === '') {
      toast.warn(t('displayNameEmpty'), toastRyles as ToastOptions);
      return false;
    } else {
      return true;
    }
  };

  const checkPasswordMathes = () => {
    if (password !== passwordConfirm) {
      toast.warn(t('passwordsDoNotMatch'), toastRyles as ToastOptions);
      return false;
    } else {
      return true;
    }
  };

  const checkUserExist = () => {
    const usersMail = Object.values(users).map((user) => user.email);
    if (usersMail.indexOf(email) != -1) {
      toast.warn(t('theUserExists'), toastRyles as ToastOptions);
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const correctPassword = checkPassword();
    const passwordsMatches = checkPasswordMathes();
    const correctMail = checkMail();
    const nameIsNotEmpty = checkDisplayName();
    const userExists = checkUserExist();

    if (
      userExists &&
      nameIsNotEmpty &&
      correctMail &&
      correctPassword &&
      passwordsMatches
    ) {
      dispatch(registerInitiate(email, password, displayName));
    }
  };

  return (
    <AuthContent>
      <AuthForm onSubmit={handleSubmit}>
        <h1>{t('registration')}</h1>
        <TextField
          id="standard-basic"
          label={t('enterYourName')}
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
        />
        <TextField
          id="standard-basic"
          label={t('enterYourMail')}
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <TextField
          id="standard-basic"
          label={t('enterYourPassword')}
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <TextField
          id="standard-basic"
          label={t('reEnterYourPassword')}
          type="password"
          name="passwordConfirm"
          value={passwordConfirm}
          onChange={handleChange}
        />
        <AuthButtons>
          <SingUpButton type="button" onClick={handleSubmit}>
            {t('createAccount')}
          </SingUpButton>
          <Link to={MainRoutes.login}>
            <SingInButton type="button">{t('goBack')}</SingInButton>
          </Link>
        </AuthButtons>
      </AuthForm>
      <ToastContainer />
    </AuthContent>
  );
};

export default Register;
