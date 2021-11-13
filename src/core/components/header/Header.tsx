import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import userSelector from '../../redux/selectors/userSelector';
import CloseModal from '../modals/closeModal/CloseModal';
import HeaderButtonContainer from './styled/HeaderButtonContainer';
import HeaderContentContainer from './styled/HeaderContentContainer';
import HeaderContainer from './styled/HeaderContainer';
import HeaderWelcome from './styled/HeaderWelcome';

const Header: React.FC = () => {
  const { user } = useTypedSelector(userSelector);
  const { t } = useTranslation();
  const [modalIsOpen, setIsOpen] = useState(false);

  const openCloseModal = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <HeaderContainer>
      <HeaderContentContainer>
        <h2>{t('marchTrello')}</h2>
      </HeaderContentContainer>

      <HeaderWelcome>
        {t('hello')} {user?.username}
      </HeaderWelcome>

      <HeaderContentContainer>
        <HeaderButtonContainer onClick={openCloseModal}>
          <ExitToAppIcon />
        </HeaderButtonContainer>
      </HeaderContentContainer>

      <CloseModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
    </HeaderContainer>
  );
};

export default Header;
