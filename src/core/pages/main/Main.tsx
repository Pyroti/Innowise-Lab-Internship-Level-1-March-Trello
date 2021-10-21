import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Header from '../../components/header/Header';
import Loader from '../../components/styled/Loader';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import {
  getBoardsData,
  writeBoardData
} from '../../redux/action-creators/boards/boardAction';
import {
  getUserData,
  writeUserBoardData
} from '../../redux/action-creators/users/userAction';
import authSelector from '../../redux/selectors/authSelector';
import boardSelector from '../../redux/selectors/boardSelector';
import userSelector from '../../redux/selectors/userSelector';
import { BoardState } from '../../redux/types/boards/boardTypes';
import AddBoard from './AddBoard/AddBoard';
import Cards from './cards/Cards';
import Board from './styled/Board';
import BoardWrap from './styled/BoardWrap';

const Main: React.FC = () => {
  const { currentUser } = useTypedSelector(authSelector);
  const { user, isLoading } = useTypedSelector(userSelector);
  const { board } = useTypedSelector(boardSelector);

  const filterBoards = () => {
    return Object.keys(user?.boards ?? {})
      .map((boardId) => {
        return board?.[boardId];
      })
      .filter((board) => board);
  };

  const dispatch = useDispatch();

  const [boardState, setBoardState] = useState({
    boardTitle: ''
  });
  const { boardTitle } = boardState;

  const getCurrentUserData = () => {
    dispatch(getUserData(currentUser));
  };

  useEffect(() => {
    dispatch(getUserData(currentUser));
  }, [currentUser, dispatch]);

  useEffect(() => {
    if (user && user.boards) {
      dispatch(getBoardsData(Object.keys(user.boards)));
    }
  }, [dispatch, user]);

  const handleChangeBoard = (event: React.ChangeEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    setBoardState((prevState) => ({ ...prevState, [name]: value }));
  };

  const createOrderNum = () => {
    if (user.boards) {
      return Object.keys(user.boards).length + 1;
    } else {
      return 1;
    }
  };

  const addBoard = () => {
    const boardId = uuidv4();
    const order = createOrderNum();
    dispatch(writeBoardData(boardId, order, boardTitle, board));
    dispatch(writeUserBoardData(currentUser, boardId));
    setBoardState({ boardTitle: '' });
    getCurrentUserData();
  };

  const sortBorder = (a: BoardState, b: BoardState) => {
    if (a.order > b.order) {
      return 1;
    } else {
      return -1;
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  const dataToRender = Object.values(filterBoards() ?? []);

  return (
    <>
      <Header />
      <BoardWrap>
        {board &&
          dataToRender.sort(sortBorder).map((boardd) => {
            return (
              boardd && (
                <Board key={boardd.boardId}>
                  {boardd.title}
                  <Cards boardId={boardd.boardId} />
                </Board>
              )
            );
          })}
        <AddBoard
          title={boardTitle}
          name="boardTitle"
          handleChange={handleChangeBoard}
          addBoard={addBoard}
        />
      </BoardWrap>
    </>
  );
};

export default Main;
