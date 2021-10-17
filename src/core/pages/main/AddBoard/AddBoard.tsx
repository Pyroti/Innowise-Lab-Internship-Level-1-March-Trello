import Input from '@mui/material/Input';
import React, { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AddBoardButton from './styled/AddBoardButton';
import AddBoardWrap from './styled/AddBoardWrap';
import AddBoardWrapButton from './styled/AddBoardWrapButton';
import CloseBoardIcon from './styled/CloseBoardIcon';

interface Props {
  title: string;
  handleChange: (event: ChangeEvent<Element>) => void;
  addBoard: () => void;
}

const AddBoard: React.FC<Props> = (props) => {
  const [isOpenAddWrap, setIsOpenAddWrap] = useState(false);
  const { title, handleChange, addBoard } = props;

  const { t } = useTranslation();

  const openAddwrap = () => setIsOpenAddWrap((prev) => !prev);

  if (isOpenAddWrap) {
    return (
      <AddBoardWrap>
        <Input
          placeholder="Введите заголовок доски"
          type="text"
          name="title"
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
