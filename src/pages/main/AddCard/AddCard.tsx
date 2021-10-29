import Input from '@mui/material/Input';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AddCardButton from './styled/AddCardButton';
import AddCardWrap from './styled/AddCardWrap';
import AddCardWrapButton from './styled/AddCardWrapButton';
import CloseCardIcon from './styled/CloseCardIcon';

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

  const openCardwrap = () => setIsOpenCardWrap((prevCardWrap) => !prevCardWrap);

  const keyPress = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        addCard(boardId);
        openCardwrap();
      }
    },
    [addCard, boardId]
  );

  useEffect(() => {
    if (isOpenCardWrap) {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    }
  }, [keyPress, isOpenCardWrap]);

  if (isOpenCardWrap) {
    return (
      <AddCardWrap>
        <Input
          placeholder={t('enterTitle')}
          type="text"
          name={name}
          value={title}
          onChange={handleChange}
        />
        <AddCardWrapButton type="button" onClick={() => addCard(boardId)}>
          {t('addCard')}
        </AddCardWrapButton>
        <CloseCardIcon onClick={openCardwrap} />
      </AddCardWrap>
    );
  }
  return (
    <AddCardButton type="button" onClick={openCardwrap}>
      {t('addCard')}
    </AddCardButton>
  );
};

export default AddCard;
