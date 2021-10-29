import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import userSelector from '../../redux/selectors/userSelector';
import CloseModal from '../closeModal/CloseModal';
import HeaderButtonStyled from './styled/HeaderButtonStyled';
import HeaderContentWidth from './styled/HeaderContentWidth';
import HeaderStyled from './styled/HeaderStyled';

const Header: React.FC = () => {
  const { user } = useTypedSelector(userSelector);
  const { t } = useTranslation();
  const [modalIsOpen, setIsOpen] = useState(false);

  const openCloseModal = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <HeaderStyled>
      <HeaderContentWidth>
        <h2>{t('marchTrello')}</h2>
      </HeaderContentWidth>

      <HeaderContentWidth>
        <h2>
          {t('hello')} {user?.username}
        </h2>
      </HeaderContentWidth>

      <HeaderContentWidth>
        <HeaderButtonStyled onClick={openCloseModal}>
          <ExitToAppIcon />
        </HeaderButtonStyled>
      </HeaderContentWidth>

      <CloseModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
    </HeaderStyled>
  );
};

export default Header;
