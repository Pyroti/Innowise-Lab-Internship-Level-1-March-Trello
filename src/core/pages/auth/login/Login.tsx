import TextField from '@material-ui/core/TextField';
import GoogleIcon from '@mui/icons-material/Google';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import AuthContent from '../../../components/styled/AuthContent';
import AuthForm from '../../../components/styled/AuthForm';
import MainRoutes from '../../../constants/MainRouters';
import { useTypedSelector } from '../../../hooks/useTypeSelector';
import { googleSignInInitiate } from '../../../redux/action-creators/auth/googleSignInAction';
import { loginInitiate } from '../../../redux/action-creators/auth/loginAction';
import authSelector from '../../../redux/selectors/authSelector';
import AuthButtons from './styled/AuthButtons';
import GoogleButton from './styled/GoogleButton';
import SingInButton from './styled/SingInButton';
import SingUpButton from './styled/SingUpButton';

const Login: React.FC = () => {
  const [state, setState] = useState({
    email: '',
    password: ''
  });

  const { email, password } = state;

  const { currentUser } = useTypedSelector(authSelector);

  const history = useHistory();
  const { t } = useTranslation();

  useEffect(() => {
    if (currentUser) {
      history.push(MainRoutes.main);
    }
  }, [currentUser, history]);

  const dispatch = useDispatch();

  const handleGoogleSignIn = () => {
    dispatch(googleSignInInitiate());
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (email && password) {
      dispatch(loginInitiate(email, password));
      setState({ email: '', password: '' });
    }
  };

  const handleChange = (event: React.ChangeEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const callbackRef = useCallback((inputElement) => {
    if (email && password && inputElement) {
      inputElement.focus();
    }
  }, []);

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
          inputRef={callbackRef}
        />
        <TextField
          id="standard-basic"
          label={t('enterYourPassword')}
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          inputRef={callbackRef}
        />

        <AuthButtons>
          <SingInButton type="submit">{t('logIn')}</SingInButton>

          <Link to={MainRoutes.register}>
            <SingUpButton type="submit">{t('registration')}</SingUpButton>
          </Link>
        </AuthButtons>
      </AuthForm>
    </AuthContent>
  );
};

export default Login;
