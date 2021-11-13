import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef
} from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import MainRouters from '../../../constants/MainRouters';
import CancelButton from '../modalStyled/CancelButton';
import ExitButton from '../modalStyled/ExitButton';
import ModalBackground from '../modalStyled/ModalBackground';
import ModalContent from '../modalStyled/ModalContent';
import ModalIcon from '../modalStyled/ModalIcon';
import ModalWrapper from '../modalStyled/ModalWrapper';

interface Props {
  modalIsOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  delBoard: () => void;
}

const DeleteBoardModal: React.FC<Props> = (props: Props) => {
  const { t } = useTranslation();

  const { modalIsOpen, setIsOpen, delBoard } = props;

  const modalRef = useRef();

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

  const closeApp = () => {
    delBoard();
    showModal();
  };

  return (
    <>
      {modalIsOpen ? (
        <ModalBackground onClick={closeModal} ref={modalRef}>
          <ModalWrapper>
            <ModalContent>
              <h1>{t('deleteBoard')}</h1>
              <Link to={MainRouters.login}>
                <ExitButton type="button" onClick={closeApp}>
                  {t('yes')}
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

export default DeleteBoardModal;
