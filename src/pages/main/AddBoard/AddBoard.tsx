import Input from '@mui/material/Input';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AddBoardButton from './styled/AddBoardButton';
import AddBoardWrap from './styled/AddBoardWrap';
import AddBoardWrapButton from './styled/AddBoardWrapButton';
import CloseBoardIcon from './styled/CloseBoardIcon';

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

  const openAddwrap = () => setIsOpenAddWrap((prev) => !prev);

  const keyPress = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        addBoard();
        openAddwrap();
      }
    },
    [addBoard]
  );

  useEffect(() => {
    if (isOpenAddWrap) {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    }
  }, [keyPress, isOpenAddWrap]);

  if (isOpenAddWrap) {
    return (
      <AddBoardWrap>
        <Input
          placeholder={t('enterTitle')}
          type="text"
          name={name}
          value={title}
          onChange={handleChange}
        />
        <AddBoardWrapButton type="button" onClick={addBoard}>
          {t('addBoard')}
        </AddBoardWrapButton>
        <CloseBoardIcon onClick={openAddwrap} />
      </AddBoardWrap>
    );
  }
  return (
    <AddBoardButton type="button" onClick={openAddwrap}>
      {t('addBoard')}
    </AddBoardButton>
  );
};

export default AddBoard;
