import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef
} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import MainRouters from '../../constants/MainRouters';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import { logoutInitiate } from '../../redux/action-creators/auth/logoutAction';
import authSelector from '../../redux/selectors/authSelector';
import CancelButton from './styled/CancelButton';
import CloseModalBackground from './styled/CloseModalBackground';
import CloseModalContent from './styled/CloseModalContent';
import CloseModalIcon from './styled/CloseModalIcon';
import CloseModalWrapper from './styled/CloseModalWrapper';
import ExitButton from './styled/ExitButton';

interface Props {
  modalIsOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const CloseModal: React.FC<Props> = (props: Props) => {
  const { t } = useTranslation();
  const { currentUser } = useTypedSelector(authSelector);
  const { modalIsOpen, setIsOpen } = props;

  const modalRef = useRef();

  const dispatch = useDispatch();

  const closeModal = (event: React.MouseEvent<HTMLElement>) => {
    if (modalRef.current === event.target) {
      setIsOpen(false);
    }
  };

  const keyPress = useCallback(
    (event) => {
      if (event.key === 'Escape' && modalIsOpen) {
        setIsOpen(false);
      }
    },
    [modalIsOpen, setIsOpen]
  );

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
  }, [keyPress]);

  const showGameModal = () => setIsOpen((prev) => !prev);

  const handleAuth = () => {
    if (currentUser) {
      dispatch(logoutInitiate());
    }
  };

  const closeTheGame = () => {
    showGameModal();
    handleAuth();
  };

  return (
    <>
      {modalIsOpen ? (
        <CloseModalBackground onClick={closeModal} ref={modalRef}>
          <CloseModalWrapper>
            <CloseModalContent>
              <h1>{t('AreYouSureYouWantToLogOut')}</h1>
              <Link to={MainRouters.login}>
                <ExitButton type="button" onClick={closeTheGame}>
                  {t('exit')}
                </ExitButton>
              </Link>
              <CancelButton type="button" onClick={showGameModal}>
                {t('cancel')}
              </CancelButton>
            </CloseModalContent>
            <CloseModalIcon onClick={showGameModal} />
          </CloseModalWrapper>
        </CloseModalBackground>
      ) : null}
    </>
  );
};

export default CloseModal;
