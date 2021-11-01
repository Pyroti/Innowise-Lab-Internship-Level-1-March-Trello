import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import sortData from '../../../core/helpers/sortData';
import { useTypedSelector } from '../../../core/hooks/useTypeSelector';
import {
  getCardsData,
  updateCardOrderData
} from '../../../core/redux/action-creators/cards/cardAction';
import boardSelector from '../../../core/redux/selectors/boardSelector';
import cardSelector from '../../../core/redux/selectors/cardSelector';
import userSelector from '../../../core/redux/selectors/userSelector';
import addCardThunk from '../../../core/redux/thunk/cards/AddCard';
import changeCardOrderBetweenBoardsDnDThunk from '../../../core/redux/thunk/cards/changeCardOrderBetweenBoardsDnD';
import changeCardOrderInBoardDnDThunk from '../../../core/redux/thunk/cards/changeCardOrderInBoardDnD';
import dropHandlerThunk from '../../../core/redux/thunk/cards/dropHandler';
import { CardState } from '../../../core/redux/types/cards/cardTypes';
import AddCard from '../AddCard/AddCard';
import Card from './card/Card';

interface Props {
  boardId: string;
  currentCard: CardState;
  setCurrentCard: React.Dispatch<CardState>;
  currentBordIdcard: string;
  setCurrentBordIdcard: React.Dispatch<string>;
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
    currentBordIdcard,
    setCurrentBordIdcard,
    currentItemNameId,
    setCurrentItemNameId,
    isUpdateCards,
    setIsUpdateCards
  } = props;
  const [cardState, setCardState] = useState({
    cardTitle: ''
  });

  const { cardTitle } = cardState;

  const cardsId = useCallback(() => {
    if (user.boards) {
      const allCardsId = Object.values(
        Object.keys(user.boards).map((boardIdd) => board[boardIdd]?.cards)
      ).filter((card) => card);
      const finalCardsId = Object.assign({}, ...allCardsId);
      return Object.keys(finalCardsId);
    }
  }, [board, user.boards]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (board && board[boardId].cards) {
      dispatch(getCardsData(cardsId()));
    }
  }, [dispatch, board, boardId, cardsId]);

  const handleChangeCard = (event: React.ChangeEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    setCardState((prevState) => ({ ...prevState, [name]: value }));
  };

  const showCards = (boardId: string) => {
    return Object.values(card).filter(
      (element) =>
        Object.keys(board[boardId].cards).indexOf(element.cardId) > -1
    );
  };

  const createOrderNumCard = (currentBoardId: string): number => {
    if (board[currentBoardId].cards) {
      return showCards(boardId).length + 1;
    } else {
      return 1;
    }
  };

  const addCard = () => {
    const addCardThunkData = {
      createOrderNumCard,
      setCardState,
      boardId,
      cardTitle
    };
    dispatch(addCardThunk(addCardThunkData));
  };

  const updateCardsOrder = (boardId: string) => {
    showCards(boardId)
      .sort(sortData)
      .forEach((card, index) => {
        dispatch(updateCardOrderData(card.cardId, index + 1));
      });
  };

  if (isUpdateCards) {
    updateCardsOrder(currentBordIdcard);
    setIsUpdateCards(false);
  }

  const dragStartHandler = (
    event: React.DragEvent<HTMLDivElement>,
    cardData: CardState
  ) => {
    setCurrentCard(cardData);
    setCurrentBordIdcard(boardId);
    const elemName = (event.target as Element).id;
    setCurrentItemNameId(elemName);
  };

  const dragOverHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const changeCardOrderInBoardDnD = (cardData: CardState) => {
    const data = { showCards, currentCard, boardId, cardData };
    dispatch(changeCardOrderInBoardDnDThunk(data));
  };

  const changeCardOrderBetweenBoardsDnD = (cardData: CardState) => {
    const data = {
      updateCardsOrder,
      currentBordIdcard,
      cardData,
      boardId,
      showCards,
      currentCard
    };
    dispatch(changeCardOrderBetweenBoardsDnDThunk(data));
  };

  const dropHandler = (
    event: React.DragEvent<HTMLDivElement>,
    cardData: CardState
  ) => {
    event.preventDefault();
    const data = {
      currentItemNameId,
      cardNameId,
      currentBordIdcard,
      changeCardOrderInBoardDnD,
      cardData,
      boardId,
      changeCardOrderBetweenBoardsDnD
    };
    dispatch(dropHandlerThunk(data));
  };

  return (
    <>
      <div>
        {card &&
          board[boardId].cards &&
          showCards(boardId)
            .sort(sortData)
            .map((cardData) => (
              <div
                id="card"
                key={cardData.cardId}
                onDragStart={(event) => dragStartHandler(event, cardData)}
                onDragOver={(event) => dragOverHandler(event)}
                onDrop={(event) => dropHandler(event, cardData)}
                draggable={true}
              >
                <Card
                  cardsId={cardsId}
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
