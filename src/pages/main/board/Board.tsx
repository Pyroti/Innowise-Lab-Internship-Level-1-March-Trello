import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../core/hooks/useTypeSelector';
import boardSelector from '../../../core/redux/selectors/boardSelector';
import BoardTitle from './styled/BoardTitle';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { BoardState } from '../../../core/redux/types/boards/boardTypes';
import OptionWrap from '../cards/card/styled/OptionContainer';
import CreateIcon from '@mui/icons-material/Create';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@mui/icons-material/Check';
import Input from '@mui/material/Input';
import cardSelector from '../../../core/redux/selectors/cardSelector';
import DeleteBoardModal from '../../../core/components/modals/deleteBoardModal/deleteBoardModal';
import deleteBoardThunk from '../../../core/redux/thunk/boards/deleteBoard';
import editBoardThunk from '../../../core/redux/thunk/boards/editBoard';
import { deleteCardData } from '../../../core/redux/thunk/cards/deleteCardData';

interface BoardProps {
  boardData: BoardState;
  updateBoardsOrder: () => void;
}

const Board: React.FC<BoardProps> = (props) => {
  const { boardData, updateBoardsOrder } = props;

  const { board } = useTypedSelector(boardSelector);
  const cards = useTypedSelector(cardSelector).card;
  const [isEditing, setIsEditing] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [boardState, setBoardState] = useState({
    boardTitle: boardData.title
  });
  const { boardTitle } = boardState;

  const dispatch = useDispatch();

  const isEditBoard = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  const editBoard = useCallback(() => {
    const data = { boardData, boardTitle };
    dispatch(editBoardThunk(data));
    isEditBoard();
  }, [boardData, boardTitle, dispatch]);

  const keyPress = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        editBoard();
      }
    },
    [editBoard]
  );

  useEffect(() => {
    if (isEditing) {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    }
  }, [keyPress, isEditing]);

  const deleteCardsInBoard = (boardId: string) => {
    const cardsInBoards = board[boardId].cards;
    if (cardsInBoards) {
      const cardsId = Object.keys(cardsInBoards);
      cardsId.map((cardId) => {
        dispatch(deleteCardData(cardId, cards));
      });
    }
  };

  const deleteBoard = (boardId: string) => {
    const data = {
      deleteCardsInBoard,
      boardId,
      updateBoardsOrder
    };
    dispatch(deleteBoardThunk(data));
  };

  const handleChange = (event: React.ChangeEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    setBoardState((prevState) => ({ ...prevState, [name]: value }));
  };

  const delBoard = () => deleteBoard(boardData.boardId);

  const openDeleteBoardModal = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  if (isEditing) {
    return (
      <BoardTitle>
        <Input
          placeholder={boardData.title}
          type="text"
          name="boardTitle"
          value={boardTitle}
          onChange={handleChange}
        />
        <OptionWrap>
          <CheckIcon onClick={editBoard} />
          <CloseIcon onClick={isEditBoard} />
        </OptionWrap>
      </BoardTitle>
    );
  }

  return (
    <>
      <BoardTitle>
        {boardData.order}
        {':'}
        {boardData.title}
        <OptionWrap>
          <CreateIcon onClick={isEditBoard} />
          <DeleteRoundedIcon onClick={openDeleteBoardModal} />
        </OptionWrap>
      </BoardTitle>
      <DeleteBoardModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        delBoard={delBoard}
      />
    </>
  );
};

export default Board;
