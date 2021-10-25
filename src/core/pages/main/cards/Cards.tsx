import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useTypedSelector } from '../../../hooks/useTypeSelector';
import {
  deleteCardIdData,
  getBoardsData
} from '../../../redux/action-creators/boards/boardAction';
import {
  deleteCardData,
  getCardsData,
  updateCardOrderData,
  writeBoardCardData,
  writeCardData
} from '../../../redux/action-creators/cards/cardAction';
import boardSelector from '../../../redux/selectors/boardSelector';
import cardSelector from '../../../redux/selectors/cardSelector';
import userSelector from '../../../redux/selectors/userSelector';
import { CardState } from '../../../redux/types/cards/cardTypes';
import AddBoard from '../AddBoard/AddBoard';
import Card from './Card/Card';

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
    const allCardsId = Object.values(
      Object.keys(user.boards).map((boardIdd) => board[boardIdd].cards)
    ).filter((card) => card);

    const finalCardsId = Object.assign({}, ...allCardsId);

    return Object.keys(finalCardsId);
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

  const createOrderNumCard = (currentBoardId: string) => {
    if (board[currentBoardId].cards) {
      return showCards(boardId).length + 1;
    } else {
      return 1;
    }
  };

  const addCard = (boardId: string) => {
    const cardId = uuidv4();
    const order = createOrderNumCard(boardId);
    dispatch(writeCardData(cardId, order, cardTitle, 'none', card));
    dispatch(writeBoardCardData(boardId, cardId));
    setCardState({ cardTitle: '' });
    dispatch(getBoardsData(Object.keys(user.boards)));
  };

  const sortCard = (a: CardState, b: CardState) => {
    if (a.order > b.order) {
      return 1;
    } else {
      return -1;
    }
  };

  const updateCardsOrder = (boardId: string) => {
    showCards(boardId)
      .sort(sortCard)
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
    showCards(boardId).map((card) => {
      const isCurrentCard = card.cardId === currentCard.cardId;

      const isFirstCard =
        card.order <= cardData.order &&
        card.order > currentCard.order &&
        currentCard.order < cardData.order;

      const isLastCard =
        card.order >= cardData.order &&
        card.order < currentCard.order &&
        currentCard.order > cardData.order;

      if (isCurrentCard) {
        dispatch(updateCardOrderData(card.cardId, cardData.order));
      } else if (isFirstCard) {
        dispatch(updateCardOrderData(card.cardId, card.order - 1));
      } else if (isLastCard) {
        dispatch(updateCardOrderData(card.cardId, card.order + 1));
      }
    });
  };

  const changeCardOrderBetweenBoardsDnD = (cardData: CardState) => {
    dispatch(deleteCardData(currentCard.cardId, card));
    dispatch(deleteCardIdData(currentCard.cardId, currentBordIdcard));
    updateCardsOrder(boardId);
    updateCardsOrder(currentBordIdcard);
    dispatch(
      writeCardData(
        currentCard.cardId,
        cardData.order,
        currentCard.title,
        'none',
        card
      )
    );
    dispatch(writeBoardCardData(boardId, currentCard.cardId));
    showCards(boardId).map((cardItem) => {
      if (cardItem.order >= cardData.order) {
        dispatch(updateCardOrderData(cardItem.cardId, cardItem.order + 1));
      }
    });
  };

  const dropHandler = (
    event: React.DragEvent<HTMLDivElement>,
    cardData: CardState
  ) => {
    event.preventDefault();
    const isCard = currentItemNameId === cardNameId;
    const isCurrentBoard = currentBordIdcard === boardId;
    if (isCard) {
      if (isCurrentBoard) {
        changeCardOrderInBoardDnD(cardData);
      } else {
        changeCardOrderBetweenBoardsDnD(cardData);
      }
      dispatch(getBoardsData(Object.keys(user.boards)));
    }
  };

  return (
    <>
      <div>
        {card &&
          board[boardId].cards &&
          showCards(boardId)
            .sort(sortCard)
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
      <AddBoard
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
