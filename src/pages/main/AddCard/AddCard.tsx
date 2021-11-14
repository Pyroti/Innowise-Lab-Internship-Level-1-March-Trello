import Input from '@mui/material/Input';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AddButton from '../../../core/components/buttons/AddButton';
import AddContainer from '../../../core/components/addContainer/AddContainer';
import AddWrapButton from '../../../core/components/buttons/AddContainerButton';
import CloseIcon from '../../../core/components/closeIcon/CloseIcon';

interface Props {
  title: string;
  name: string;
  handleChange: (event: ChangeEvent<Element>) => void;
  boardId: string;
  addCard: (boardId: string) => void;
}

const AddCard: React.FC<Props> = (props) => {
  const [isOpenCardWrap, setIsOpenCardWrap] = useState(false);
  const { title, name, handleChange, boardId, addCard } = props;

  const { t } = useTranslation();

  const openCardWrap = useCallback(() => {
    setIsOpenCardWrap((prevCardWrap) => !prevCardWrap);
  }, []);

  const keyPress = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        addCard(boardId);
        openCardWrap();
      }
    },
    [addCard, boardId, openCardWrap]
  );

  useEffect(() => {
    if (isOpenCardWrap) {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    }
  }, [keyPress, isOpenCardWrap]);

  const addCardClick = () => addCard(boardId);

  if (isOpenCardWrap) {
    return (
      <AddContainer>
        <Input
          placeholder={t('enterTitle')}
          type="text"
          name={name}
          value={title}
          onChange={handleChange}
        />
        <AddWrapButton type="button" onClick={addCardClick}>
          {t('addCard')}
        </AddWrapButton>
        <CloseIcon onClick={openCardWrap} />
      </AddContainer>
    );
  }

  return (
    <AddButton type="button" onClick={openCardWrap}>
      {t('addCard')}
    </AddButton>
  );
};

export default AddCard;
