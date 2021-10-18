import Input from '@mui/material/Input';
import React, { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AddBoardButton from './styled/AddBoardButton';
import AddBoardWrap from './styled/AddBoardWrap';
import AddBoardWrapButton from './styled/AddBoardWrapButton';
import CloseBoardIcon from './styled/CloseBoardIcon';

interface Props {
  title: string;
  name: string;
  handleChange: (event: ChangeEvent<Element>) => void;
  addBoard?: () => void;
  boardId?: string;
  addCard?: (boardId: string) => void;
}

const AddBoard: React.FC<Props> = (props) => {
  const [isOpenAddWrap, setIsOpenAddWrap] = useState(false);
  const { title, name, handleChange, addBoard, boardId, addCard } = props;

  const { t } = useTranslation();

  const openAddwrap = () => setIsOpenAddWrap((prev) => !prev);

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
        {boardId ? (
          <AddBoardWrapButton type="button" onClick={() => addCard(boardId)}>
            {t('addCard')}
          </AddBoardWrapButton>
        ) : (
          <AddBoardWrapButton type="button" onClick={addBoard}>
            {t('addBoard')}
          </AddBoardWrapButton>
        )}

        <CloseBoardIcon onClick={openAddwrap} />
      </AddBoardWrap>
    );
  }
  if (boardId) {
    return (
      <AddBoardButton type="button" onClick={openAddwrap}>
        {t('addCard')}
      </AddBoardButton>
    );
  }
  return (
    <AddBoardButton type="button" onClick={openAddwrap}>
      {t('addBoard')}
    </AddBoardButton>
  );
};

export default AddBoard;
