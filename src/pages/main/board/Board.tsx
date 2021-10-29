import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../core/hooks/useTypeSelector';
import {
  deleteBoardData,
  editBoardData,
  getBoardsData
} from '../../../core/redux/action-creators/boards/boardAction';
import { deleteCardData } from '../../../core/redux/action-creators/cards/cardAction';
import {
  deleteBoardIdData,
  getUserData
} from '../../../core/redux/action-creators/users/userAction';
import authSelector from '../../../core/redux/selectors/authSelector';
import boardSelector from '../../../core/redux/selectors/boardSelector';
import BoardTitle from './styled/BoardTitle';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { BoardState } from '../../../core/redux/types/boards/boardTypes';
import OptionWrap from '../cards/card/styled/OptionWrap';
import CreateIcon from '@mui/icons-material/Create';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@mui/icons-material/Check';
import Input from '@mui/material/Input';
import userSelector from '../../../core/redux/selectors/userSelector';

interface BoardProps {
  boardData: BoardState;
  updateBoardsOrder: () => void;
}

const Board: React.FC<BoardProps> = (props) => {
  const { boardData, updateBoardsOrder } = props;

  const { board } = useTypedSelector(boardSelector);
  const { currentUser } = useTypedSelector(authSelector);
  const { user } = useTypedSelector(userSelector);
  const [isEditing, setIsEditing] = useState(false);
  const [boardState, setBoardate] = useState({
    boardTitle: boardData.title
  });
  const { boardTitle } = boardState;

  const dispatch = useDispatch();

  const cards = useTypedSelector((state) => state.card).card;

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
    deleteCardsInBoard(boardId);
    dispatch(deleteBoardData(boardId, board));
    dispatch(deleteBoardIdData(currentUser.uid, boardId));
    updateBoardsOrder();
    dispatch(getUserData(currentUser));
  };

  const handleChange = (event: React.ChangeEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    setBoardate((prevState) => ({ ...prevState, [name]: value }));
  };

  const isEditBoard = () => {
    setIsEditing((prev) => !prev);
  };

  const editBoard = () => {
    dispatch(editBoardData(boardData.boardId, boardTitle));
    dispatch(getBoardsData(Object.keys(user.boards)));
    isEditBoard();
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
    <BoardTitle>
      {boardData.order}
      {':'}
      {boardData.title}
      <OptionWrap>
        <CreateIcon onClick={isEditBoard} />
        <DeleteRoundedIcon onClick={() => deleteBoard(boardData.boardId)} />
      </OptionWrap>
    </BoardTitle>
  );
};

export default Board;
