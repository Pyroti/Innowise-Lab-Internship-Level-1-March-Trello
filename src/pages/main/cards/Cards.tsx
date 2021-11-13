import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import sortData from '../../../core/helpers/sortData';
import { useTypedSelector } from '../../../core/hooks/useTypeSelector';
import boardSelector from '../../../core/redux/selectors/boardSelector';
import cardSelector from '../../../core/redux/selectors/cardSelector';
import userSelector from '../../../core/redux/selectors/userSelector';
import addCardThunk from '../../../core/redux/thunk/cards/AddCard';
import changeCardOrderBetweenBoardsThunk from '../../../core/redux/thunk/cards/changeCardOrderBetweenBoards';
import changeCardOrderInBoardThunk from '../../../core/redux/thunk/cards/changeCardOrderInBoard';
import dropHandlerThunk from '../../../core/redux/thunk/cards/dropHandler';
import { getCardsData } from '../../../core/redux/thunk/cards/getCardsData';
import { updateCardOrderData } from '../../../core/redux/thunk/cards/updateCardOrderData';
import { CardState } from '../../../core/redux/types/cards/cardTypes';
import AddCard from '../AddCard/AddCard';
import Card from './card/Card';

interface Props {
  boardId: string;
  currentCard: CardState;
  setCurrentCard: React.Dispatch<CardState>;
  currentBoardIdCard: string;
  setCurrentBoardIdCard: React.Dispatch<string>;
  currentItemNameId: string;
  setCurrentItemNameId: React.Dispatch<string>;
  isUpdateCards: boolean;
  setIsUpdateCards: React.Dispatch<boolean>;
}

const cardNameId = 'card';

const Cards: React.FC<Props> = (props) => {
  const { board } = useTypedSelector(boardSelector);
  const { user } = useTypedSelector(userSelector);
  const { card } = useTypedSelector(cardSelector);
  const {
    boardId,
    currentCard,
    setCurrentCard,
    currentBoardIdCard,
    setCurrentBoardIdCard,
    currentItemNameId,
    setCurrentItemNameId,
    isUpdateCards,
    setIsUpdateCards
  } = props;
  const [cardState, setCardState] = useState({
    cardTitle: ''
  });

  const { cardTitle } = cardState;

  const getCardsId = useCallback(() => {
    if (user.boards) {
      const allCardsId = Object.values(
        Object.keys(user.boards).map((boardId) => board[boardId]?.cards)
      ).filter((card) => card);
      const finalCardsId = Object.assign({}, ...allCardsId);
      return Object.keys(finalCardsId);
    }
  }, [board, user.boards]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (board && board[boardId].cards) {
      dispatch(getCardsData(getCardsId()));
    }
  }, [dispatch, board, boardId, getCardsId]);

  const handleChangeCard = (event: React.ChangeEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    setCardState((prevState) => ({ ...prevState, [name]: value }));
  };

  const getCardsForCurrentBoard = useCallback(
    (boardId: string) => {
      return Object.values(card).filter(
        (element) =>
          Object.keys(board[boardId].cards).indexOf(element.cardId) > -1
      );
    },
    [board, card]
  );

  const createOrderNumCard = useCallback(
    (currentBoardId: string): number => {
      if (board[currentBoardId].cards) {
        return getCardsForCurrentBoard(boardId).length + 1;
      } else {
        return 1;
      }
    },
    [board, boardId, getCardsForCurrentBoard]
  );

  const addCard = useCallback(() => {
    const addCardThunkData = {
      createOrderNumCard,
      setCardState,
      boardId,
      cardTitle
    };
    dispatch(addCardThunk(addCardThunkData));
  }, [boardId, cardTitle, createOrderNumCard, dispatch]);

  const updateCardsOrder = useCallback(
    (boardId: string) => {
      getCardsForCurrentBoard(boardId)
        .sort(sortData)
        .forEach((card, index) => {
          dispatch(updateCardOrderData(card.cardId, index + 1));
        });
    },
    [dispatch, getCardsForCurrentBoard]
  );

  useEffect(() => {
    if (isUpdateCards) {
      updateCardsOrder(currentBoardIdCard);
      setIsUpdateCards(false);
    }
  }, [currentBoardIdCard, isUpdateCards, setIsUpdateCards, updateCardsOrder]);

  const dragStartHandler = (
    event: React.DragEvent<HTMLDivElement>,
    cardData: CardState
  ) => {
    setCurrentCard(cardData);
    setCurrentBoardIdCard(boardId);
    const elemName = (event.target as Element).id;
    setCurrentItemNameId(elemName);
  };

  const dragOverHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const changeCardOrderInBoard = (cardData: CardState) => {
    const data = { getCardsForCurrentBoard, currentCard, boardId, cardData };
    dispatch(changeCardOrderInBoardThunk(data));
  };

  const changeCardOrderBetweenBoards = (cardData: CardState) => {
    const data = {
      updateCardsOrder,
      currentBoardIdCard,
      cardData,
      boardId,
      getCardsForCurrentBoard,
      currentCard
    };
    dispatch(changeCardOrderBetweenBoardsThunk(data));
  };

  const dropHandler = (
    event: React.DragEvent<HTMLDivElement>,
    cardData: CardState
  ) => {
    event.preventDefault();
    const data = {
      currentItemNameId,
      cardNameId,
      currentBoardIdCard,
      changeCardOrderInBoard,
      cardData,
      boardId,
      changeCardOrderBetweenBoards
    };
    dispatch(dropHandlerThunk(data));
  };
  const dragStart = (cardData: CardState) => {
    return (event: React.DragEvent<HTMLDivElement>) => {
      dragStartHandler(event, cardData);
    };
  };

  const dragDrop = (cardData: CardState) => {
    return (event: React.DragEvent<HTMLDivElement>) => {
      dropHandler(event, cardData);
    };
  };

  const isDataExist = card && board[boardId].cards;
  const dataToRender = (isDataExist && getCardsForCurrentBoard(boardId)) ?? [];

  return (
    <>
      <div>
        {dataToRender.sort(sortData).map((cardData) => (
          <div
            id="card"
            key={cardData.cardId}
            onDragStart={dragStart(cardData)}
            onDragOver={dragOverHandler}
            onDrop={dragDrop(cardData)}
            draggable={true}
          >
            <Card
              getCardsId={getCardsId}
              boardId={boardId}
              card={cardData}
              updateCardsOrder={updateCardsOrder}
            ></Card>
          </div>
        ))}
      </div>
      <AddCard
        title={cardTitle}
        name="cardTitle"
        handleChange={handleChangeCard}
        addCard={addCard}
        boardId={boardId}
      />
    </>
  );
};

export default Cards;
