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
import MainRouters from '../../../constants/MainRouters';
import { useTypedSelector } from '../../../hooks/useTypeSelector';
import authSelector from '../../../redux/selectors/authSelector';
import { logoutInitiate } from '../../../redux/thunk/auth/logoutInitiate';
import CancelButton from '../../modals/modalStyled/CancelButton';
import ExitButton from '../../modals/modalStyled/ExitButton';
import ModalBackground from '../../modals/modalStyled/ModalBackground';
import ModalContent from '../../modals/modalStyled/ModalContent';
import ModalIcon from '../../modals/modalStyled/ModalIcon';
import ModalWrapper from '../../modals/modalStyled/ModalWrapper';

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

  const showModal = () => setIsOpen((prev) => !prev);

  const handleAuth = () => {
    if (currentUser) {
      dispatch(logoutInitiate());
    }
  };

  const closeApp = () => {
    showModal();
    handleAuth();
  };

  return (
    <>
      {modalIsOpen ? (
        <ModalBackground onClick={closeModal} ref={modalRef}>
          <ModalWrapper>
            <ModalContent>
              <h1>{t('areYouSureYouWantToLogOut')}</h1>
              <Link to={MainRouters.login}>
                <ExitButton type="button" onClick={closeApp}>
                  {t('exit')}
                </ExitButton>
              </Link>
              <CancelButton type="button" onClick={showModal}>
                {t('cancel')}
              </CancelButton>
            </ModalContent>
            <ModalIcon onClick={showModal} />
          </ModalWrapper>
        </ModalBackground>
      ) : null}
    </>
  );
};

export default CloseModal;
