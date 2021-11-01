import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../../core/components/header/Header';
import { useTypedSelector } from '../../core/hooks/useTypeSelector';
import {
  getBoardsData,
  updateBoardOrderData
} from '../../core/redux/action-creators/boards/boardAction';
import { getUserData } from '../../core/redux/action-creators/users/userAction';
import authSelector from '../../core/redux/selectors/authSelector';
import boardSelector from '../../core/redux/selectors/boardSelector';
import userSelector from '../../core/redux/selectors/userSelector';
import { BoardState } from '../../core/redux/types/boards/boardTypes';
import AddBoard from './AddBoard/AddBoard';
import Cards from './cards/Cards';
import Board from './board/Board';
import BoardWrap from './styled/BoardWrap';
import BoardStyled from './board/styled/BoardStyled';
import sortData from '../../core/helpers/sortData';
import addBoardThunk from '../../core/redux/thunk/main/addBoard';
import changeBoardOrderDnDThunk from '../../core/redux/thunk/main/changeBoardOrderDnD';
import pushTheFirstCardToAnotherBoardThunk from '../../core/redux/thunk/main/pushTheFirstCardToAnotherBoard';

const boardNameId = 'board';

const Main: React.FC = () => {
  const { currentUser } = useTypedSelector(authSelector);
  const { user } = useTypedSelector(userSelector);
  const { board } = useTypedSelector(boardSelector);

  const dispatch = useDispatch();

  const [boardState, setBoardState] = useState({
    boardTitle: ''
  });
  const { boardTitle } = boardState;
  const [currentItemNameId, setCurrentItemNameId] = useState(null);
  const [currentBoard, setCurrentBoard] = useState(null);

  const [currentBordIdcard, setCurrentBordIdcard] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);
  const [isUpdateCards, setIsUpdateCards] = useState(false);

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

  const filterBoards = () => {
    return Object.keys(user?.boards ?? {})
      .map((boardId) => {
        return board?.[boardId];
      })
      .filter((board) => board);
  };

  const createOrderNum = () => {
    if (user.boards) {
      return Object.keys(user.boards).length + 1;
    } else {
      return 1;
    }
  };

  const addBoard = () => {
    const data = {
      getCurrentUserData,
      setBoardState,
      boardTitle,
      createOrderNum
    };
    dispatch(addBoardThunk(data));
  };

  const dataToRender = Object.values(filterBoards() ?? []);

  const updateBoardsOrder = () => {
    filterBoards()
      .sort(sortData)
      .forEach((board, index) => {
        dispatch(updateBoardOrderData(board.boardId, index + 1));
      });
  };

  const dragStartHandler = (
    event: React.DragEvent<HTMLDivElement>,
    boardData: BoardState
  ) => {
    const elemName = (event.target as Element).id;
    setCurrentItemNameId(elemName);
    setCurrentBoard(boardData);
  };

  const dragOverHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const changeBoardOrderDnD = (boardData: BoardState) => {
    const data = { filterBoards, currentBoard, boardData };
    dispatch(changeBoardOrderDnDThunk(data));
  };

  const pushTheFirstCardToAnotherBoard = (boardData: BoardState) => {
    const data = {
      setIsUpdateCards,
      currentCard,
      currentBordIdcard,
      boardData
    };
    dispatch(pushTheFirstCardToAnotherBoardThunk(data));
  };

  const dropHandler = (
    event: React.DragEvent<HTMLDivElement>,
    boardData: BoardState
  ) => {
    event.preventDefault();
    const isBoard = currentItemNameId === boardNameId;
    if (isBoard) {
      changeBoardOrderDnD(boardData);
    } else if (!boardData.cards) {
      pushTheFirstCardToAnotherBoard(boardData);
    }
    getCurrentUserData();
  };

  return (
    <>
      <Header />
      <BoardWrap>
        {board &&
          dataToRender.sort(sortData).map((boardData) => {
            return (
              board && (
                <BoardStyled
                  key={boardData.boardId}
                  id="board"
                  onDragStart={(event) => dragStartHandler(event, boardData)}
                  onDragOver={(event) => dragOverHandler(event)}
                  onDrop={(event) => dropHandler(event, boardData)}
                  draggable={true}
                >
                  <Board
                    boardData={boardData}
                    updateBoardsOrder={updateBoardsOrder}
                  />
                  <Cards
                    boardId={boardData.boardId}
                    currentCard={currentCard}
                    setCurrentCard={setCurrentCard}
                    currentBordIdcard={currentBordIdcard}
                    setCurrentBordIdcard={setCurrentBordIdcard}
                    currentItemNameId={currentItemNameId}
                    setCurrentItemNameId={setCurrentItemNameId}
                    isUpdateCards={isUpdateCards}
                    setIsUpdateCards={setIsUpdateCards}
                  />
                </BoardStyled>
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
