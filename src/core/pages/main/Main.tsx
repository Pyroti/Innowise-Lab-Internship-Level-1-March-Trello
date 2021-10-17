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
import userSelector from '../../redux/selectors/userSelector';
import { BoardState } from '../../redux/types/boards/boardTypes';
import AddBoard from './AddBoard/AddBoard';
import Board from './styled/Board';
import BoardWrap from './styled/BoardWrap';

const Main: React.FC = () => {
  const { currentUser } = useTypedSelector(authSelector);
  const { user, isLoading } = useTypedSelector(userSelector);
  const { board } = useTypedSelector((state) => state.board);

  const filterBoards = () => {
    return Object.keys(user?.boards ?? {})
      .map((boardId) => {
        return board?.[boardId];
      })
      .filter((board) => board);
  };

  const dispatch = useDispatch();

  const [boardState, setBoardState] = useState({
    title: ''
  });
  const { title } = boardState;

  const getCurrentUserData = () => {
    dispatch(getUserData(currentUser));
  };

  console.log(currentUser);

  useEffect(() => {
    dispatch(getUserData(currentUser));
  }, [currentUser, dispatch]);

  useEffect(() => {
    console.log('IN USE EFFECT', user);
    if (user && user.boards) {
      dispatch(getBoardsData(Object.keys(user.boards)));
    }
  }, [dispatch, user]);

  console.log('IN COMPONENT', user);

  const handleChange = (event: React.ChangeEvent) => {
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
    dispatch(writeBoardData(boardId, order, title, board));
    dispatch(writeUserBoardData(currentUser, boardId));
    setBoardState({ title: '' });
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

  console.log('dataToRender', dataToRender);
  return (
    <>
      <Header />
      <BoardWrap>
        {board &&
          dataToRender.sort(sortBorder).map((boardd) => {
            console.log('boardd', boardd);
            return boardd && <Board key={boardd.boardId}>{boardd.title}</Board>;
          })}

        <AddBoard
          title={title}
          handleChange={handleChange}
          addBoard={addBoard}
        />
      </BoardWrap>
    </>
  );
};

export default Main;
