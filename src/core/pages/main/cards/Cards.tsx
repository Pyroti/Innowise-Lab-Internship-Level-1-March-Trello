import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useTypedSelector } from '../../../hooks/useTypeSelector';
import { getBoardsData } from '../../../redux/action-creators/boards/boardAction';
import {
  getCardsData,
  updateCardOrderData,
  writeBoardCardData,
  writeCardData
} from '../../../redux/action-creators/cards/cardAction';
import boardSelector from '../../../redux/selectors/boardSelector';
import userSelector from '../../../redux/selectors/userSelector';
import { CardState } from '../../../redux/types/cards/cardTypes';
import AddBoard from '../AddBoard/AddBoard';
import Card from './Card/Card';

interface Props {
  boardId: string;
}

const Cards: React.FC<Props> = (props) => {
  const { board } = useTypedSelector(boardSelector);
  const { user } = useTypedSelector(userSelector);
  const { card } = useTypedSelector((state) => state.card);
  const { boardId } = props;
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

  const showCards = () => {
    console.log(card);
    return Object.values(card).filter(
      (element) =>
        Object.keys(board[boardId].cards).indexOf(element.cardId) > -1
    );
  };

  const createOrderNumCard = (currentBoardId: string) => {
    if (board[currentBoardId].cards) {
      return showCards().length + 1;
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

  const updateCardsOrder = () => {
    showCards()
      .sort(sortCard)
      .forEach((card, index) => {
        dispatch(updateCardOrderData(card.cardId, index + 1));
      });
  };

  return (
    <>
      <div>
        {card &&
          board[boardId].cards &&
          showCards()
            .sort(sortCard)
            .map((card) => (
              <Card
                key={card.cardId}
                cardsId={cardsId}
                boardId={boardId}
                card={card}
                updateCardsOrder={updateCardsOrder}
              ></Card>
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
