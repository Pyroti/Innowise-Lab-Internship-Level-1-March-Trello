import Input from '@mui/material/Input';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AddButton from '../../../core/components/buttons/AddButton';
import AddContainer from '../../../core/components/addContainer/AddContainer';
import AddContainerButton from '../../../core/components/buttons/AddContainerButton';
import CloseIcon from '../../../core/components/closeIcon/CloseIcon';

interface Props {
  title: string;
  name: string;
  handleChange: (event: ChangeEvent<Element>) => void;
  addBoard: () => void;
}

const AddBoard: React.FC<Props> = (props) => {
  const [isOpenAddWrap, setIsOpenAddWrap] = useState(false);
  const { title, name, handleChange, addBoard } = props;

  const { t } = useTranslation();

  const openAddWrap = useCallback(() => {
    setIsOpenAddWrap((prevIsOpenAddWrap) => !prevIsOpenAddWrap);
  }, []);

  const keyPress = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        addBoard();
        openAddWrap();
      }
    },
    [addBoard, openAddWrap]
  );

  useEffect(() => {
    if (isOpenAddWrap) {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    }
  }, [keyPress, isOpenAddWrap]);

  if (isOpenAddWrap) {
    return (
      <AddContainer>
        <Input
          placeholder={t('enterTitle')}
          type="text"
          name={name}
          value={title}
          onChange={handleChange}
        />
        <AddContainerButton type="button" onClick={addBoard}>
          {t('addBoard')}
        </AddContainerButton>
        <CloseIcon onClick={openAddWrap} />
      </AddContainer>
    );
  }
  return (
    <AddButton type="button" onClick={openAddWrap}>
      {t('addBoard')}
    </AddButton>
  );
};

export default AddBoard;
