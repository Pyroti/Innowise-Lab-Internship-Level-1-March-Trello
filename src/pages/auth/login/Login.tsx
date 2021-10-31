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
import { googleSignInInitiate } from '../../../core/redux/action-creators/auth/googleSignInAction';
import { loginInitiate } from '../../../core/redux/action-creators/auth/loginAction';
import authSelector from '../../../core/redux/selectors/authSelector';
import AuthButtons from './styled/AuthButtons';
import GoogleButton from './styled/GoogleButton';
import SingInButton from './styled/SingInButton';
import SingUpButton from './styled/SingUpButton';
import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import toastRyles from '../../../core/constants/toastRules';
import { getUsersData } from '../../../core/redux/action-creators/users/usersAction';
import usersSelector from '../../../core/redux/selectors/usersSelectors';

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
      toast.warn(t('youDidntEnterYourPassword'), toastRyles as ToastOptions);
    }
    if (password === '') {
      toast.warn(t('youDidntEnterYourEmail'), toastRyles as ToastOptions);
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
