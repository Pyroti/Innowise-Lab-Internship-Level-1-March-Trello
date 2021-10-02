import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import { registerInitiate } from '../../redux/action-creators/registerAction';

const Register: React.FC = () => {
  const [state, setState] = useState({
    displayName: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });
  const { email, password, displayName, passwordConfirm } = state;

  const { currentUser } = useTypedSelector((state) => state.user);

  const history = useHistory();

  useEffect(() => {
    if (currentUser) {
      history.push('/');
    }
  }, [currentUser, history]);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
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

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div>
      <h2>{t('login')}</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <h1>{t('registration')}</h1>
          <input
            type="text"
            placeholder={t('enterYourName')}
            name="displayName"
            value={displayName}
            onChange={handleChange}
          />
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
          <input
            type="password"
            placeholder={t('reEnterYourPassword')}
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={handleChange}
          />
          <button type="submit">{t('registerNow')}</button>
          <Link to="/login">
            <button type="button">{t('goBack')}</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
