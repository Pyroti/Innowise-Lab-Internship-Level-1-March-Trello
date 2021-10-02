import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import { googleSignInInitiate } from '../../redux/action-creators/googleSignInAction';
import { loginInitiate } from '../../redux/action-creators/loginAction';

const Login: React.FC = () => {
  const [state, setState] = useState({
    email: '',
    password: ''
  });

  const { email, password } = state;

  const { currentUser } = useTypedSelector((state) => state.user);

  const history = useHistory();
  const { t } = useTranslation();

  useEffect(() => {
    if (currentUser) {
      history.push('/');
    }
  }, [currentUser, history]);

  const dispatch = useDispatch();

  const handleGoogleSignIn = () => {
    dispatch(googleSignInInitiate());
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (email && password) {
      dispatch(loginInitiate(email, password));
      setState({ email: '', password: '' });
    }
  };

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div>
      <h2>{t('login')}</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <h1>{t('logIn')}</h1>
          <div>
            <button type="button" onClick={handleGoogleSignIn}>
              {t('signInWithGoogle')}
            </button>
          </div>
          <p>{t('or')}</p>
          <input
            type="email"
            placeholder={t('enterYourMail')}
            name="email"
            value={email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder={t('enterYourPassword')}
            name="password"
            value={password}
            onChange={handleChange}
          />
          <button type="submit">{t('logIn')}</button>
          <p>{t('dontHaveAnAccount')}</p>
          <Link to="/register">
            <button type="submit">{t('registration')}</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
