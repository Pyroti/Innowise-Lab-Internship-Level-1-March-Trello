import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../../core/components/header/Header';
import { useTypedSelector } from '../../core/hooks/useTypeSelector';
import authSelector from '../../core/redux/selectors/authSelector';
import boardSelector from '../../core/redux/selectors/boardSelector';
import userSelector from '../../core/redux/selectors/userSelector';
import { BoardState } from '../../core/redux/types/boards/boardTypes';
import AddBoard from './AddBoard/AddBoard';
import Cards from './cards/Cards';
import Board from './board/Board';
import BoardContainer from './board/styled/BoardContainer';
import sortData from '../../core/helpers/sortData';
import addBoardThunk from '../../core/redux/thunk/boards/addBoard';
import pushTheFirstCardToAnotherBoardThunk from '../../core/redux/thunk/boards/pushTheFirstCardToAnotherBoard';
import changeBoardOrderThunk from '../../core/redux/thunk/boards/changeBoardOrder';
import BoardsContainer from './styled/BoardsContainer';
import { getBoardsData } from '../../core/redux/thunk/boards/getBoardsData';
import { updateBoardOrderData } from '../../core/redux/thunk/boards/updateBoardOrderData';
import { getUserData } from '../../core/redux/thunk/users/getUserData';

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

  const [currentBoardIdCard, setCurrentBoardIdCard] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);
  const [isUpdateCards, setIsUpdateCards] = useState(false);

  const getCurrentUserData = useCallback(() => {
    dispatch(getUserData(currentUser));
  }, [currentUser, dispatch]);

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

  const createOrderNum = useCallback(() => {
    if (user.boards) {
      return Object.keys(user.boards).length + 1;
    } else {
      return 1;
    }
  }, [user.boards]);

  const addBoard = useCallback(() => {
    const data = {
      getCurrentUserData,
      setBoardState,
      boardTitle,
      createOrderNum
    };
    dispatch(addBoardThunk(data));
  }, [boardTitle, createOrderNum, dispatch, getCurrentUserData]);

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

  const changeBoardOrder = (boardData: BoardState) => {
    const data = { filterBoards, currentBoard, boardData };
    dispatch(changeBoardOrderThunk(data));
  };

  const pushTheFirstCardToAnotherBoard = (boardData: BoardState) => {
    const data = {
      setIsUpdateCards,
      currentCard,
      currentBoardIdCard,
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
      changeBoardOrder(boardData);
    } else if (!boardData.cards) {
      pushTheFirstCardToAnotherBoard(boardData);
    }
    getCurrentUserData();
  };

  const dragStart = (boardData: BoardState) => {
    return (event: React.DragEvent<HTMLDivElement>) => {
      dragStartHandler(event, boardData);
    };
  };

  const dragDrop = (boardData: BoardState) => {
    return (event: React.DragEvent<HTMLDivElement>) => {
      dropHandler(event, boardData);
    };
  };

  return (
    <>
      <Header />
      <BoardsContainer>
        {board &&
          dataToRender.sort(sortData).map((boardData) => {
            return (
              board && (
                <BoardContainer
                  key={boardData.boardId}
                  id="board"
                  onDragStart={dragStart(boardData)}
                  onDragOver={dragOverHandler}
                  onDrop={dragDrop(boardData)}
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
                    currentBoardIdCard={currentBoardIdCard}
                    setCurrentBoardIdCard={setCurrentBoardIdCard}
                    currentItemNameId={currentItemNameId}
                    setCurrentItemNameId={setCurrentItemNameId}
                    isUpdateCards={isUpdateCards}
                    setIsUpdateCards={setIsUpdateCards}
                  />
                </BoardContainer>
              )
            );
          })}
        <AddBoard
          title={boardTitle}
          name="boardTitle"
          handleChange={handleChangeBoard}
          addBoard={addBoard}
        />
      </BoardsContainer>
    </>
  );
};

export default Main;
