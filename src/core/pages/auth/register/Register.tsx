import { TextField } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import AuthContent from '../../../components/styled/AuthContent';
import AuthForm from '../../../components/styled/AuthForm';
import MainRoutes from '../../../constants/MainRouters';
import { useTypedSelector } from '../../../hooks/useTypeSelector';
import { registerInitiate } from '../../../redux/action-creators/registerAction';
import userSelector from '../../../redux/selectors/userSelector';
import AuthButtons from './styled/AuthButtons';
import SingInButton from './styled/SingInButton';
import SingUpButton from './styled/SingUpButton';

const Register: React.FC = () => {
  const [state, setState] = useState({
    displayName: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });
  const { email, password, displayName, passwordConfirm } = state;

  const { currentUser } = useTypedSelector(userSelector);

  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (currentUser) {
      history.push(MainRoutes.main);
    }
  }, [currentUser, history]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (password === passwordConfirm) {
      dispatch(registerInitiate(email, password, displayName));
      setState({
        email: '',
        password: '',
        displayName: '',
        passwordConfirm: ''
      });
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
        <h1>{t('registration')}</h1>
        <TextField
          id="standard-basic"
          label={t('enterYourName')}
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          inputRef={callbackRef}
        />
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
        <TextField
          id="standard-basic"
          label={t('reEnterYourPassword')}
          type="password"
          name="passwordConfirm"
          value={passwordConfirm}
          onChange={handleChange}
          inputRef={callbackRef}
        />
        <AuthButtons>
          <SingUpButton type="submit">{t('createAccount')}</SingUpButton>
          <Link to={MainRoutes.login}>
            <SingInButton type="button">{t('goBack')}</SingInButton>
          </Link>
        </AuthButtons>
      </AuthForm>
    </AuthContent>
  );
};

export default Register;
