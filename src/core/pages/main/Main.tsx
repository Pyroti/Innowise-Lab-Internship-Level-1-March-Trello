import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import MainRoutes from '../../constants/MainRouters';
import { auth } from '../../firebase/firebase';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import { logoutInitiate } from '../../redux/action-creators/logoutAction';

const Main: React.FC = () => {
  const { currentUser } = useTypedSelector((state) => state.user);
  const dispath = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();

  useEffect(() => {
    if (!currentUser) {
      history.push(MainRoutes.login);
    }
  }, [currentUser, history]);

  const handleAuth = () => {
    if (currentUser) {
      dispath(logoutInitiate());
    }
  };

  return (
    <div>
      <h2>{t('marchTrello')}</h2>
      <h3>
        {t('hello')} {auth.currentUser?.displayName}
      </h3>
      <button type="button" onClick={handleAuth}>
        {t('exit')}
      </button>
    </div>
  );
};

export default Main;
