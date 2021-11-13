import TextField from '@material-ui/core/TextField';
import GoogleIcon from '@mui/icons-material/Google';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import AuthContent from '../../../core/components/authContent/AuthContent';
import AuthForm from '../../../core/components/authForm/AuthForm';
import MainRoutes from '../../../core/constants/MainRouters';
import { useTypedSelector } from '../../../core/hooks/useTypeSelector';
import authSelector from '../../../core/redux/selectors/authSelector';
import AuthButtons from '../../../core/components/buttons/AuthButtons';
import GoogleButton from '../../../core/components/buttons/GoogleButton';
import SingInButton from '../../../core/components/buttons/SingInButton';
import SingUpButton from '../../../core/components/buttons/SingUpButton';
import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import toastRyles from '../../../core/constants/toastRules';
import usersSelector from '../../../core/redux/selectors/usersSelectors';
import { googleSignInInitiate } from '../../../core/redux/thunk/auth/googleSignInInitiate';
import { loginInitiate } from '../../../core/redux/thunk/auth/loginInitiate';
import { getUsersData } from '../../../core/redux/thunk/users/getUsersData';

const Login: React.FC = () => {
  const [loginState, setLoginState] = useState({
    email: '',
    password: ''
  });

  const { email, password } = loginState;

  const { currentUser } = useTypedSelector(authSelector);
  const { users } = useTypedSelector(usersSelector);

  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      history.push(MainRoutes.main);
    }
  }, [currentUser, history]);

  useEffect(() => {
    dispatch(getUsersData());
  }, [dispatch]);

  const handleGoogleSignIn = () => {
    dispatch(googleSignInInitiate());
  };

  const checkEmptyInput = () => {
    if (email === '') {
      toast.warn(t('youDidNotEnterYourPassword'), toastRyles as ToastOptions);
    }
    if (password === '') {
      toast.warn(t('youDidNotEnterYourEmail'), toastRyles as ToastOptions);
    }
  };

  const checkUserExists = () => {
    const usersMail = Object.values(users).map((user) => user.email);
    if (usersMail.indexOf(email) === -1) {
      toast.warn(t('theUserDoesNotExist'), toastRyles as ToastOptions);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    checkEmptyInput();
    checkUserExists();
    if (email && password) {
      dispatch(loginInitiate(email, password));
      setLoginState({ email: email, password: '' });
    }
  };

  const handleChange = (event: React.ChangeEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    setLoginState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <AuthContent>
      <AuthForm onSubmit={handleSubmit}>
        <h1>{t('marchTrello')}</h1>

        <GoogleButton type="button" onClick={handleGoogleSignIn}>
          <GoogleIcon />
        </GoogleButton>

        <p>{t('or')}</p>

        <TextField
          id="email"
          label={t('enterYourMail')}
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <TextField
          id="password"
          label={t('enterYourPassword')}
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />

        <AuthButtons>
          <SingInButton type="submit">{t('logIn')}</SingInButton>
          <Link to={MainRoutes.register}>
            <SingUpButton type="button">{t('registration')}</SingUpButton>
          </Link>
        </AuthButtons>
      </AuthForm>
      <ToastContainer />
    </AuthContent>
  );
};

export default Login;
