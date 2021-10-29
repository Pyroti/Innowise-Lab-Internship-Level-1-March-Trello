import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Header from '../../core/components/header/Header';
import { useTypedSelector } from '../../core/hooks/useTypeSelector';
import {
  deleteCardIdData,
  getBoardsData,
  updateBoardOrderData,
  writeBoardData
} from '../../core/redux/action-creators/boards/boardAction';
import {
  getUserData,
  writeUserBoardData
} from '../../core/redux/action-creators/users/userAction';
import authSelector from '../../core/redux/selectors/authSelector';
import boardSelector from '../../core/redux/selectors/boardSelector';
import userSelector from '../../core/redux/selectors/userSelector';
import { BoardState } from '../../core/redux/types/boards/boardTypes';
import AddBoard from './AddBoard/AddBoard';
import Cards from './cards/Cards';
import Board from './board/Board';
import BoardWrap from './styled/BoardWrap';
import BoardStyled from './board/styled/BoardStyled';
import {
  deleteCardData,
  writeBoardCardData,
  writeCardData
} from '../../core/redux/action-creators/cards/cardAction';
import cardSelector from '../../core/redux/selectors/cardSelector';
import sortData from '../../core/helpers/sortData';

const boardNameId = 'board';

const Main: React.FC = () => {
  const { currentUser } = useTypedSelector(authSelector);
  const { user } = useTypedSelector(userSelector);
  const { board } = useTypedSelector(boardSelector);
  const { card } = useTypedSelector(cardSelector);

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
    const boardId = uuidv4();
    const order = createOrderNum();
    dispatch(writeBoardData(boardId, order, boardTitle, board));
    dispatch(writeUserBoardData(currentUser, boardId));
    setBoardState({ boardTitle: '' });
    getCurrentUserData();
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

  const dropHandler = (
    event: React.DragEvent<HTMLDivElement>,
    boardData: BoardState
  ) => {
    event.preventDefault();
    const isBoard = currentItemNameId === boardNameId;
    if (isBoard) {
      filterBoards().map((board) => {
        const isCurrentBoard = board.boardId === currentBoard.boardId;

        const isFirstBoard =
          board.order <= boardData.order &&
          board.order > currentBoard.order &&
          currentBoard.order < boardData.order;

        const isLastBoard =
          board.order >= boardData.order &&
          board.order < currentBoard.order &&
          currentBoard.order > boardData.order;

        if (isCurrentBoard) {
          dispatch(updateBoardOrderData(board.boardId, boardData.order));
        } else if (isFirstBoard) {
          dispatch(updateBoardOrderData(board.boardId, board.order - 1));
        } else if (isLastBoard) {
          dispatch(updateBoardOrderData(board.boardId, board.order + 1));
        }
      });
    } else if (!boardData.cards) {
      dispatch(deleteCardData(currentCard.cardId, card));
      dispatch(deleteCardIdData(currentCard.cardId, currentBordIdcard));
      setIsUpdateCards(true);
      dispatch(
        writeCardData(currentCard.cardId, 1, currentCard.title, 'none', card)
      );
      dispatch(writeBoardCardData(boardData.boardId, currentCard.cardId));
      dispatch(getBoardsData(Object.keys(user.boards)));
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
